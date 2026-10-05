const { spawn, spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, ".local/mysql");
const socket = path.join(dataDir, "mysql.sock");
const children = [];
let stopping = false;

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: root, encoding: "utf8", ...options });
  if (result.error || result.status !== 0) {
    throw new Error(result.error?.message || result.stderr || `${command} failed`);
  }
  return result.stdout;
}

function start(command, args, options = {}) {
  const child = spawn(command, args, { cwd: root, stdio: "inherit", ...options });
  children.push(child);
  child.on("error", (error) => {
    console.error(error.message);
    stop(1);
  });
  child.on("exit", (code) => {
    if (!stopping) {
      console.error(`${command} exited unexpectedly (${code}).`);
      stop(code || 1);
    }
  });
  return child;
}

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of [...children].reverse()) child.kill("SIGTERM");
  setTimeout(() => process.exit(code), 1500);
}
process.on("SIGTERM", () => stop());
process.on("SIGINT", () => stop());

async function main() {
  let databaseEnv = {};
  if (!process.env.DB_HOST && !process.env.DB_SOCKET_PATH) {
    fs.mkdirSync(dataDir, { recursive: true, mode: 0o700 });
    fs.chmodSync(dataDir, 0o700);
    const common = ["--no-defaults", `--datadir=${dataDir}`];
    if (!fs.existsSync(path.join(dataDir, "mysql"))) {
      console.log("Initializing workspace-only MySQL (no TCP connections).");
      run("mysqld", [...common, "--initialize-insecure", `--log-error=${dataDir}/mysql.log`]);
    }
    start("mysqld", [
      ...common,
      `--socket=${socket}`,
      "--skip-networking",
      "--mysqlx=OFF",
      `--pid-file=${dataDir}/mysql.pid`,
      `--log-error=${dataDir}/mysql.log`,
    ]);
    const client = ["--no-defaults", `--socket=${socket}`, "--user=root"];
    let ready = false;
    for (let attempt = 0; attempt < 120; attempt++) {
      const probe = spawnSync("mysql", [...client, "-e", "SELECT 1"], { stdio: "ignore" });
      if (probe.status === 0) {
        ready = true;
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    if (!ready) throw new Error("MySQL did not become ready. Check .local/mysql/mysql.log.");
    run("mysql", [...client, "-e", "CREATE DATABASE IF NOT EXISTS sweetstore"]);
    const tableCount = run("mysql", [
      ...client, "-N", "-e",
      "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='sweetstore'",
    ]).trim();
    if (tableCount === "0") {
      const exportPath = process.env.MYSQL_IMPORT_FILE ||
        path.join(root, "attached_assets/0_sweetstore_1791211126436.sql");
      if (!fs.existsSync(exportPath)) {
        throw new Error("Upload the SQL export and set MYSQL_IMPORT_FILE to its path.");
      }
      console.log("Importing SQL export into the empty development database.");
      run("mysql", [...client, "sweetstore"], {
        input: fs.readFileSync(exportPath, "utf8"),
        maxBuffer: 10 * 1024 * 1024,
      });
    }
    databaseEnv = { DB_SOCKET_PATH: socket, DB_USER: "root", DB_NAME: "sweetstore" };
  }
  start("node", ["server.js"], {
    cwd: path.join(root, "backend"),
    env: { ...process.env, ...databaseEnv, PORT: "5005" },
  });
  start("npm", ["start"], {
    cwd: path.join(root, "frontend"),
    env: {
      ...process.env,
      HOST: "0.0.0.0",
      PORT: "5000",
      BROWSER: "none",
      DANGEROUSLY_DISABLE_HOST_CHECK: "true",
    },
  });
}

main().catch((error) => {
  console.error(error.message);
  stop(1);
});

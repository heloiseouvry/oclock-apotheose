const host = "100.25.136.194";
//const host = "localhost";
const port = "4000";
const adminRouter = "admin";
const baseRouter = "v1";

const base_url = `http://${host}:${port}`;
const admin_url = `http://${host}:${port}/${adminRouter}`;
const router_url = `http://${host}:${port}/${baseRouter}`;

export { base_url, admin_url, router_url };

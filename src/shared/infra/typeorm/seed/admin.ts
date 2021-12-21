import { getConnection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";
import createConnection from "../index";

async function create() {
  const id = uuidv4();
  const password = await hash("admin", 8);

  const connection = await createConnection("localhost");

  await connection.query(
    `INSERT INTO USERS(id, name, email,password, 'isAdmin', created_at, driver_license) VALUES('${id}', 'admin', 'admin@admin.com', ${password}, true, now(), 'XXXXXX')`
  );

  await connection.close();
}

create().then(() => console.log("User admin created"));

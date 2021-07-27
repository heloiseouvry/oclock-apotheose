const CoreModel = require("./coreModel");
const db = require("../database.js");

class Address extends CoreModel {
  static async findAll() {
    const data = await CoreModel.fetch("SELECT * FROM address;");
    return data.map((d) => new Address(d));
  }

  static async findById(id) {
    return new Address(await CoreModel.fetchOne("SELECT * FROM address WHERE id = $1;", [id]));
  }

  async save() {
    if (this.id) {
      try {
        const preparedQuery = {
          text: `UPDATE address SET (main, additional, zip_code, city)=($1, $2, $3, $4) WHERE id = $5`,
          values: [this.main, this.additional, this.zip_code, this.city, this.id],
        };
        const { rows } = await db.query(preparedQuery);
      } catch (error) {
        console.error(error);
        throw new Error(error.detail);
      }
    } else {
      try {
        const preparedQuery = {
          text: "INSERT INTO address (main, additional, zip_code, city) VALUES($1, $2, $3, $4) RETURNING id",
          values: [this.main, this.additional, this.zip_code, this.city],
        };
        const { rows } = await db.query(preparedQuery);
        this.id = rows[0].id;
      } catch (error) {
        console.error(error);
        throw new Error(error.detail);
      }
    }
  }

  async delete() {
    try {
      const preparedQuery = {
        text: `DELETE FROM address WHERE id=$1;`,
        values: [this.id],
      };
      await db.query(preparedQuery);
    } catch (error) {
      console.error(error);
      throw new Error(error.detail);
    }
  }
}

module.exports = Address;

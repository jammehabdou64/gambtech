const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const createController = require("../files/controller");
const createModel = require("../files/model");
const rootPath = require("app-root-path").path;
class Command {
  addAdmin(fileName) {
    try {
      let adminPath = path.resolve(`${rootPath}/app/Controllers/Admin`);
      if (fs.existsSync(`${adminPath}/${fileName}.js`)) {
        return console.log(chalk.yellow(`${fileName} already exist`));
      }
      fs.writeFileSync(
        `${adminPath}/${fileName}.js`,
        createController(fileName)
      );

      return console.log(chalk.green(`${fileName} added successfully`));
    } catch (err) {
      console.log(chalk.yellow(`${fileName} not added`));
    }
  }

  addApi(fileName) {
    try {
      let apiPath = path.resolve(`${rootPath}/app/Controllers/Api`);
      if (fs.existsSync(`${apiPath}/${fileName}.js`)) {
        return console.log(chalk.yellow(`${fileName} already exist`));
      }
      fs.writeFileSync(`${apiPath}/${fileName}.js`, createController(fileName));
      return console.log(chalk.green(`${fileName} added successfully`));
    } catch (err) {
      console.log(chalk.yellow(`${fileName} not added`));
    }
  }

  addModel(fileName) {
    try {
      let modelPath = path.resolve(`${rootPath}/app/Models`);
      if (fs.existsSync(`${modelPath}/${fileName}.js`)) {
        return console.log(chalk.yellow(`${fileName} already exist`));
      }
      fs.writeFileSync(`${modelPath}/${fileName}.js`, createModel(fileName));
      return console.log(chalk.green(`${fileName} added successfully`));
    } catch (err) {
      return console.log(chalk.yellow(`${fileName} not added`));
    }
  }
  
  notFound()
  {
  return console.log(chalk.red(`No such command`));
  }

}

module.exports = new Command();

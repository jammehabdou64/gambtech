const command = require("./commands")

const getCommandLineArgv = (commandArg)=>{
    let makeCommand = commandArg[0].split(":")[1]

    if(makeCommand === "ApiController")
    {
    return command.addApi(commandArg[1])
    }

    if(makeCommand === "AdminController")
    {
    return command.addAdmin(commandArg[1])
    }

    if(makeCommand === "Model")
    {
    return command.addModel(commandArg[1])
    }
    
    return command.notFound()
}
module.exports = getCommandLineArgv

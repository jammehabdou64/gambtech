const getControllerName = (name) => {
  return `
class ${name}{

     /**
     *
     * @return  Express Request\Response
     */
     index(req ,res)
    {
        //
    }
   
    /**
     *
     * 
     * @return Express Request\Response
     */
     store(req, res)
    {
        //
    }
   
    /**
     *
     * @param    id
     * @return Express Request\Response
     */
     show(req,res)
    {
        //
    }
   
    /**
     *
     * @param  Express  req
     * @param    id
     * @return Express Request\Response
     */
     update(req,res)
    {
        //
    }
   
    /**
     *
     * @param  id
     * @return Express Response
     */
     destroy(req,res)
    {
    
    }
   
   
}
module.exports = new ${name}()
   `;
};
module.exports = getControllerName;

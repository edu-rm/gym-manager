module.exports = {
    ageCalc : function(timestamp){
        const today = new Date()
        const birth = new Date(timestamp)
        
        let age = today.getFullYear() - birth.getFullYear()
     
        const month = today.getMonth() - birth.getMonth()
        const day = today.getDate() - (birth.getDate()+1)
        
        if(month < 0 || (month == 0 && day<0 ))
        {
            age = age -1 
        }
    
        return age
    },
    formatCreatedAt : function(timestamp){
        const joined = new Intl.DateTimeFormat('pt-BR').format(timestamp)
        const format = joined.split('-')
        let finalDate =""
        for(let i = 0 ; i<format.length; i++){
            if (i == (format.length-1)) {
                finalDate = finalDate.concat(format[(format.length-1) - i])
            }else{
                finalDate = finalDate.concat(format[(format.length-1) - i]).concat('/')
            }
            
        }
        return finalDate
    },
    dateFormat : function(timestamp){
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth()+1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)


        return {
            iso: `${year}-${month}-${day}`,
            day,
            month,
            year,
            birthday : `${day}/${month}`
        }



    }

}
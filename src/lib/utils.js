module.exports = {
    ageCalc(timestamp){
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
    dateFormat(timestamp){
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth()+1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)


        return {
            iso: `${year}-${month}-${day}`,
            day,
            month,
            year,
            birthday : `${day}/${month}`,
            formatCreatedAt : `${day}/${month}/${year}`
        }



    }

}
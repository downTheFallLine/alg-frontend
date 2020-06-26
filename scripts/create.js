
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function formattedDate(d = new Date) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${day}-${month}-${year}`;
}



 const App = new Vue({
    el: '#app',
    data: {
        baseUrl: 'http://44.233.202.250:8080/v1/',
         //baseUrl: 'http://localhost:8080/v1/',
            userName: '',
            rank: '',
            degreeName: '',
            isIssuer: true,
            isStudent: false,
            isRelyingParty: false
    },
    created: function () {
      
        
       
        
        
    },
    methods: {
        clearClicked: function() {
            this.userName=''
            this.degreeName=''
            this.rank=''
        },
        createClicked: function() {
            url = this.baseUrl+"verifiableCredential" 
            today = formattedDate()
            claims = [
                {'key': 'rnk', 'value': this.rank}, 
                {'key': 'dgr', 'value': this.degreeName}, 
                {'key': 'dt', 'value': today}]
            formData = {'canonicalId': this.userName, 'claims': claims}
            config = {headers: {'Accept': 'text/plain', 'Content-Type': 'application/json'}}
            axios.post(url, formData, config)
                .then (response => {
                    resp = response.data;
                    alert("Credential has been created: "+resp)       
                })
                .catch (error => {
                    alert(error);
                })
        }
    }
})

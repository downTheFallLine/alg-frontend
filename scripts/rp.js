
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




 const App = new Vue({
    el: '#app',
    data: {
        baseUrl: 'http://44.233.202.250:8080/v1/',
        validationStatus: 'unknown',
        rawCredential: '',
        isIssuer: false,
        isStudent: false,
        isRelyingParty: true,
        claims: [
          
        ]
    },
    created: function () {
      
        
       
        
        
    },
    methods: {
        validateClicked: function() {
            this.claims = []
            try {
                parts = this.rawCredential.split(".")
                if (parts.length != 3) {
                    alert("Malformed credential.   Must have three parts.")
                } else {
                    header = atob(parts[0])
                    body = atob(parts[1])
                    
                    h = JSON.parse(header)
                    b = JSON.parse(body)

                    for (var key in h) {
                        if (h.hasOwnProperty(key)) {
                            console.log(key + " -> " + h[key]);
                            it = {'key': key, 'value': h[key]}
                            this.claims.push(it)
                        }
                    }

                    for (var key in b) {
                        if (b.hasOwnProperty(key)) {
                            console.log(key + " -> " + b[key]);
                            it = {'key': key, 'value': b[key]}
                            this.claims.push(it)
                        }
                    }

                    // now make an axios call
                    this.validationStatus-"Processing Please Wait"
                    url = this.baseUrl+"admin/isJWCValid" 
                    formData = {'jwc': 'abc'}
                    config = {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}
                    axios.post(url, formData, config)
                        .then (response => {
                            resp = response.data;
                            if (resp.jwcStatus) {
                                this.validationStatus = "Verifiable Credential is valid"
                            } else {
                                   this.validationStatus = "Verifiable Credential HAS FAILED VALIDATION"
                            }  
                        })
                        .catch (error => {
                            alert(error);
                            this.validationStatus="System Error"
                        })
                }
            } catch (err) {
                alert("Unable to process credential")
            }
        },
        createClicked: function() {
        }
    }
})

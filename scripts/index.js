
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
            userName: '',
            isIssuer: false,
            isStudent: false,
            isRelyingParty: false,
            password: ''
    },
    created: function () {
      
        
       
        
        
    },
    methods: {
        loginClicked: function() {

            if (this.password == 'admin') {
                if (this.userName == "issuer") {
                    this.isIssuer = true
                    this.isStudent = false
                    this.isRelyingParty = false
                } else {
                    this.isIssuer = false
                }
                if (this.userName == "rp") {
                    this.isRelyingParty=true
                    this.isIssuer=false
                    this.isStudent=false
                } else {
                    this.isRelyingParty =false
                }
                if ((this.userName != "issuer") && (this.userName != "rp")) {
                    this.isStudent = true;
                    this.isIssuer = false
                    this.isRelyingParty = false
                    window.localStorage.setItem("userName", this.userName);
                }
            } else {
                alert("Bad password")
            }
        }
    }
})

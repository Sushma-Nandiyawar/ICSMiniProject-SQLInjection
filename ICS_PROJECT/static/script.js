async function showData(username,password){
    let res = fetch('/show',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user:username,
            password: password
        })
    })
    let result = await fetch('/show');
    p = await result.json();
    console.log(p);
    return p.data;
}


function call(){
    console.log("etet");
    var username = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    console.log(username);
    console.log(pass);
    showData(username,pass).then(function(d){
        console.log(d);
        console.log(d[0].account_no);
        var perrow = 2, // 3 cells per row
      html = "<thead><tr><th>Account No.</th><th>Account Balance</th></tr></thead><tbody>";

  // Loop through array and add table cells
  for (var i=0; i<d.length; i++) {
    html += "<tr><td>" + d[i].account_no + "</td>"+"<td>"+d[i].account_balance+"</td></tr>";
  }
  html += "</tbody>";

  // Attach HTML to container
  document.getElementById("showw").innerHTML = html;
    });
    return false;
}
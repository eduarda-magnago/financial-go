document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const senha = document.getElementById("senha").value;
  const erro = document.getElementById("erro");

  if (senha === "adm-123") {
    window.location.href = "/dashboard"; 
  } else {
    erro.style.display = "block";
  }
});

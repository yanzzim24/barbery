async function agendar(){

const dados = {
nome:document.getElementById("nome").value,
telefone:document.getElementById("telefone").value,
servico:document.getElementById("servico").value,
data:document.getElementById("data").value,
horario:document.getElementById("horario").value
}

const resposta = await fetch("http://localhost:3000/agendar",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(dados)
})

const resultado = await resposta.json()

alert(resultado.message)

}
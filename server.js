const express = require("express")
const sqlite3 = require("sqlite3").verbose()

const app = express()
app.use(express.json())

const db = new sqlite3.Database("barbearia.db")

db.run(`
CREATE TABLE IF NOT EXISTS agendamentos(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT,
telefone TEXT,
servico TEXT,
data TEXT,
horario TEXT
)
`)

app.post("/agendar",(req,res)=>{

const {nome,telefone,servico,data,horario} = req.body

// verifica se já existe horário no mesmo dia
db.get(
"SELECT * FROM agendamentos WHERE data = ? AND horario = ?",
[data,horario],
(err,row)=>{

if(row){
return res.json({
status:"erro",
message:"Esse horário já está reservado"
})
}

// se não existir, salva
db.run(
"INSERT INTO agendamentos (nome,telefone,servico,data,horario) VALUES (?,?,?,?,?)",
[nome,telefone,servico,data,horario]
)

res.json({
status:"ok",
message:"Agendamento confirmado"
})

})

})

app.listen(3000,()=>{
console.log("Servidor rodando em http://localhost:3000")
})
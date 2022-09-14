const linhaModelo = document.querySelector(".linhamodelo")
const listaProdutos = document.querySelector("#lista-produtos")

const linhaModeloD = document.querySelector(".linhamodeloD")
const listaProdutosD = document.querySelector("#lista-produtosD")

const dindins = document.querySelector(".dindins")
const saldo = document.querySelector(".saldo")

const modal = document.querySelector(".modal")

var soma = 0
var sub = 0

function getTabela() {
fetch("http://localhost:3000/produtos")
    .then(res => { return res.json() })
    .then(produtos => {
        produtos.forEach(produto => {
            data = new Date(produto.data_lancamento)
            dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
            if (produto.tipo == 'C') {

                let linha = linhaModelo.cloneNode(true);
                linha.classList.remove("model");

                let colunas = linha.querySelectorAll("td");

                colunas[0].innerHTML = produto.n_lancamento;
                colunas[1].innerHTML = dataFormatada;
                colunas[2].innerHTML = produto.descricao;
                colunas[3].innerHTML = "R$ " + produto.valor;
                colunas[4].innerHTML = produto.tipo;
                listaProdutos.appendChild(linha);

                soma = soma += parseFloat(produto.valor)
            } else {
                (produto.tipo == 'D')

                let linha2 = linhaModeloD.cloneNode(true)
                linha2.classList.remove("model")

                let colunas = linha2.querySelectorAll("td");

                colunas[0].innerHTML = produto.n_lancamento;
                colunas[1].innerHTML = dataFormatada;
                colunas[2].innerHTML = produto.descricao;
                colunas[3].innerHTML = "R$ " + produto.valor;
                colunas[4].innerHTML = produto.tipo;
                listaProdutosD.appendChild(linha2);
                
                sub = sub += parseFloat(produto.valor)
            }

        })
        let DinDin = saldo.cloneNode(true)
        DinDin.classList.remove("model")

        result = soma - sub
        DinDin.querySelector("#soma").innerHTML = result

        dindins.appendChild(DinDin)
        console.log(result)
    })
}

    function mostrarModal() {
        modal.style.display = "block"
        
    }

    function fecharModal() {
        modal.style.display = "none"
        
    }

    function cadastrar() {
        let desc = document.querySelector("#des").value
        let tipo = document.querySelector("#selected").value
        let val = document.querySelector("#Valor").value
    
        let dados = {
            "descricao": desc,
            "valor": val,
            "tipo": tipo
        }
    
        fetch("http://localhost:3000/produtos", {
            "method": "Post",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(dados)
        })
            .then(res => { return res.json() })
            .then(resp => {
                if (resp.descricao !== undefined) {
                    alert("Produto Cadastrado com Sucesso!")
                    window.location.reload()
                } else {
                    alert("Não foi possivél lançar o produto")
                }
            })
    }
    

    function filtrarDatas(e) {
        let modelo = document.querySelector(".linhamodelo")
    
        let tab1 = document.querySelector("#lista-produtos")
        let tab2 = document.querySelector("#lista-produtosD")
    
        tab1.innerHTML = ""
        tab2.innerHTML = ""
    
        tab1.appendChild(modelo)
    
        fetch("http://localhost:3000/produtos")
            .then(res => { return res.json() })
            .then(lancamentos => {
                lancamentos.forEach(Lancamento => {
    
                    if (e == Lancamento.data_lancamento.split("T")[0]) {
                        let linha = modelo.cloneNode(true)
                        linha.classList.remove("model")
    
                        let colunas = linha.querySelectorAll("td")
                        colunas[0].innerHTML = Lancamento.n_lancamento
                        colunas[1].innerHTML = Lancamento.data_lancamento.split("T")[0]
                        colunas[2].innerHTML = Lancamento.descricao
                        colunas[3].innerHTML = "R$ " + Lancamento.valor
    
                        if (Lancamento.tipo === "C") {
                            colunas[4].innerHTML = "C"
                            document.querySelector("#lista-produtos").appendChild(linha)
                        } else {
                            colunas[4].innerHTML = "D"
                            document.querySelector("#lista-produtosD").appendChild(linha)
                        }
                    } else if (e == "todos") {
                        tab1.innerHTML = ""
                        tab2.innerHTML = ""
    
                        tab1.appendChild(modelo)
                        getTabela()
                    }
                })
            })
    }


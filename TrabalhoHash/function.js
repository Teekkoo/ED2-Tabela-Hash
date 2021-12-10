var vetor = [];

// Conteudo do Arquivo
function ViewList(list) {
  var fileContents01 = document.getElementById("content01");
  var fileContents02 = document.getElementById("content02");
  var fileContents03 = document.getElementById("content03");
  var newList1 = [];
  var newList3 = [];
  var newList2 = [];
  var value = list.length;
  value = Math.trunc(value / 3);
  list.forEach((item, index) => {
    if (index < value) {
      newList1.push(item[0] + " - " + item[1] + "\n");
      fileContents01.innerText = newList1;
    } else {
      if (index < value + value) {
        newList2.push(item[0] + " - " + item[1] + "\n");
        fileContents02.innerText = newList2;
      } else {
        newList3.push(item[0] + " - " + item[1] + "\n");
        fileContents03.innerText = newList3;
      }
    }
  });
}

// Converte nomes em uma soma dos codigo
function converter(name) {
  if (name !== undefined) {
    var value = name.split("");
    var ascV = 0;
    value.forEach((item) => {
      ascV += item.charCodeAt(0);
    });
    return ascV;
  }
}

// Tabela Completa
function viewVetor(id) {
  var table = document.getElementById(id);
  var newVetor = [];
  vetor.forEach((item, index) => {
    newVetor.push(index + "[" + item[0] + "-" + item[1] + "] ");
  });
  table.innerText = newVetor;
}

function hash1(dado, tam) {
  return dado % tam;
}

function hash2(dado, tam) {
  // return (2 * dado - 1) % tam;
  return 7;
}

// inicia funçao cria tabela hash         {[nome, rg], [nome, rg],...}
function init(list) {
  const tamanho = list.length;
  list.forEach((item) => {
    createTableHash(item, tamanho);
    viewVetor("filecontentsTable");
  });
}

// Status da Tabela Hash
function createTableHash(item, tam) {
  var status = document.getElementById("filecontents");
  let colisao = 1;
  var asc = converter(item[0]);
  var hash = hash1(asc, tam);
  var bar =
    "-------------------------------------------------------------------------";

  var contentTeste =
    "Tenta Inserir o valor " + item + " na posição " + hash + "\n" + bar + "\n";

  var contentAceito =
    item +
    " Inserido com Sucesso na posição " +
    hash +
    "!\n" +
    bar +
    "\n" +
    bar +
    "\n" +
    bar +
    "\n";
  var contentRecusado =
    "colidiu pela " +
    colisao +
    "º na posição: " +
    hash +
    " valor: " +
    item +
    " com o valor " +
    vetor[hash] +
    "\n" +
    bar +
    "\n";
  status.innerText += contentTeste;
  if (vetor[hash] === undefined) {
    status.innerText += contentAceito;
    vetor[hash] = item;
  } else {
    status.innerText += contentRecusado;
    let h2 = hash2(converter(item[0]), tam);
    while (colisao < tam) {
      colisao += 1;
      var p1 = (hash + colisao * h2) % tam;

      status.innerText +=
        "Tenta Inserir o valor " +
        item +
        " na posição " +
        p1 +
        "\n" +
        bar +
        "\n";
      if (vetor[p1] === undefined) {
        vetor[p1] = item;
        status.innerText +=
          item +
          " Inserido com Sucesso na posição " +
          p1 +
          "!\n" +
          bar +
          "\n" +
          bar +
          "\n" +
          bar +
          "\n";
        break;
      } else {
        status.innerText +=
          "colidiu pela " +
          colisao +
          "º na posição: " +
          p1 +
          " valor: " +
          item[0] +
          " com o valor " +
          vetor[p1] +
          "\n" +
          bar +
          "\n";
      }
    }
  }
}

// Seleciona Arquivo TXT
window.onload = function CreateList() {
  var fileSelected = document.getElementById("txtfiletoread");
  fileSelected.addEventListener(
    "change",
    function (e) {
      //Defina a extensão do arquivo
      var fileExtension = /text.*/;
      //Obtenha o objeto de arquivo
      var fileTobeRead = fileSelected.files[0];
      //Verifique a correspondência de extensão
      if (fileTobeRead.type.match(fileExtension)) {
        //Inicialize o objeto FileReader para ler o 2file
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          var dados = fileReader.result;
          var numsList = [];
          var lines = dados.split("\n"); //quebra o arquivo em linhas,

          for (var i in lines) {
            var row = lines[i];
            if (row !== "") {
              // verifica se a linha não esta vazia
              var nums = row.split(","); //quebra a linha em valores separdos por virgula
              numsList.push(nums); //adiciona o item no array
            }
          }

          ViewList(numsList);
          init(numsList);
          if (
            document.getElementById("section_1").classList.contains("dNone")
          ) {
            document.getElementById("section_1").classList.remove("dNone");
            document.getElementById("section_1").classList.add("dBlock");
          }
        };
        fileReader.readAsText(fileTobeRead);
      } else {
        alert("Por favor selecione arquivo texto");
      }
    },
    false
  );
};

// Status da Busca
function consultaNome(name, dado, rg, status) {
  var bar =
    "-------------------------------------------------------------------------";

  if (vetor[dado][0] === name) {
    // {[0,1],[0,1],[0,1]}
    if (rg === "" || vetor[dado][1] === rg) {
      status.innerText +=
        "Valor da Busca Encontrado: " +
        vetor[dado] +
        " na Posição: " +
        dado +
        "\n" +
        bar +
        "\n" +
        bar +
        "\n";
      document.getElementById("nameDelete").value = vetor[dado][0];
      document.getElementById("rgDelete").value = vetor[dado][1];
      return 1;
    } else {
      status.innerText +=
        " colidiu pela " +
        colisao +
        " º na posição: " +
        dado +
        " : " +
        rg +
        " com o valor: " +
        vetor[dado] +
        " Tenta Novamente! " +
        "\n" +
        bar +
        "\n";
      return 0;
    }
  } else {
    status.innerText +=
      " colidiu pela " +
      colisao +
      " º na posição: " +
      dado +
      " com o valor: " +
      vetor[dado] +
      " Tenta Novamente! " +
      "\n" +
      bar +
      "\n";
    return 0;
  }
}

// Pesquisa Tabela
function buscaNome(name) {
  colisao = 1;
  let hashB = hash1(converter(name), vetor.length);
  let status = document.getElementById("filecontentsBusca");
  let rg = document.getElementById("rg").value;
  var bar =
    "-------------------------------------------------------------------------";
  status.innerText += "Realiza Busca por: " + name + "\n" + bar + "\n";
  let testa = consultaNome(name, hashB, rg, status);
  if (testa === 0) {
    let h2 = hash2(converter(name), vetor.length);
    while (colisao < vetor.length) {
      colisao++;
      let newhash = (hashB + colisao * h2) % vetor.length;
      let testa = consultaNome(name, newhash, rg, status);
      if (testa === 1) {
        break;
      }
    }
  }
}

// Deleta Dados
function deletaDados(name, rg) {
  if (name !== "") {
    colisao = 1;
    let hashB = hash1(converter(name), vetor.length);
    let status = document.getElementById("filecontentsDelete");

    var bar =
      "-------------------------------------------------------------------------";
    status.innerText += status.innerText +=
      "Realiza Busca para Deletar o valor: " +
      name +
      " : " +
      rg +
      "\n" +
      bar +
      "\n";
    let testa = consultaNome(name, hashB, rg, status);
    if (testa === 0) {
      let h2 = hash2(converter(name), vetor.length);
      while (colisao < vetor.length) {
        colisao++;
        let newhash = (hashB + colisao * h2) % vetor.length;
        let testa = consultaNome(name, newhash, rg, status);
        if (testa === 1) {
          status.innerText +=
            "Deleta o valor: " +
            name +
            ":" +
            rg +
            " na posição: " +
            newhash +
            "\n" +
            bar +
            "\n";
          vetor[newhash] = [""];
          break;
        }
      }
    } else {
      status.innerText +=
        "Deleta o valor: " +
        name +
        ":" +
        rg +
        " na posição: " +
        hashB +
        "\n" +
        bar +
        "\n";
      vetor[hashB] = [""];
    }
    viewVetor("filecontentsTableDelete");
  } else {
    window.alert("Deve Realizar a Busca Primeiro!");
  }
}

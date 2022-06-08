// abrir credenciais

const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require('./credenciais.json');
const arquivo = require('./arquivo.json');

const getDoc = async () => {
    const doc = new GoogleSpreadsheet(arquivo.id);
    
    await doc.useServiceAccountAuth({
        client_email: credenciais.client_email,
        private_key: credenciais.private_key.replace(/\\n/g, '\n')
    })
    await doc.loadInfo();
    return doc;
}
getDoc().then(doc => {
    console.log(doc.title);
});

//inserir dados
let sheet; 
getDoc().then(doc => {
    sheet = doc.sheetsByIndex[0];
    sheet.addRow({
        nome: "João Victor",
        idade: 21,
        email: "joao@medium.com"
    }).then(() => {
        console.log('dado salvo!')
    })
});

//obter dados
// let sheet; 
// getDoc().then(doc => {
//     sheet = doc.sheetsByIndex[0];
//     sheet.getRows().then(rows => {
//         rows.map(row => {
//             console.log(row.nome);
//         })
//     })
// })

// atualizar dados
// let sheet;
// getDoc().then(doc => {
//     sheet = doc.sheetsByIndex[0];
//     sheet.getRows().then(rows => {
//         rows.map(row => {
//             if(row.nome === "João Victor"){
//                 row.nome = "Victor";
//                 row.idade = 31;
//                 row.email = "medium@joao.com"
                
//                 row.save().then(() => {
//                     console.log('Dado atualizado!');
//                 });
//             }
//         });
//     })
// })

// deletar dados
// let sheet; 
// getDoc().then(doc => {
//     sheet = doc.sheetsByIndex[0];
//     sheet.getRows().then(rows => {
//         rows.map(row => {
//             if(row.nome === "Victor"){
//                 row.delete().then(() => {
//                     console.log('Dado deletado!');
//                 });
//             }
//         });
//     })
// })
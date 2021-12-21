# Cadastro de carro

**RF**
Deve ser possivel cadastrar um novo carro

**RN**
Não deve ser possivel cadastrar um carro com uma placa ja existente
Não deve ser possivel alterar a placa de um carro ja cadastrado
O carro deve ser cadastrado com disponibilidade por padrao
O usuario responsavel pelo cadastro deve ser um administrador

# Listagem de carros

**RF**
Deve ser possivel listar os carros disponiveis
Deve ser possivel listar todas as categorias
Deve ser possivel listar todos os carros disponiveis pelo nome da categoria
Deve ser possivel listar todos os carros disponiveis pelo nome da marca
Deve ser possivel listar todos os carros disponiveis pelo nome do carro

**RN**
O usuario não precisa estar logado no sistema

# Cadastro de especificacao no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro
Deve ser possivel listar todas as especificaçoes
deve ser possivel lista todos os carros

**RN**
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado
O usuario responsavel pelo cadastro deve ser um administrador

# Cadastro de imagens do carro

**RF**
Deve ser possivel cadastrar a imagem do carro
Deve ser possivel listar todos os carros

**RNF**
Ultilizar o multer para o upload dos arquivos

**RN**
O usuario deve ser possivel cadastrar mais de uma imagem pro carro

# Aluguel de carro

**RF**
Deve ser possivel listar cadastrar um aluguel

**RN**
O aluguel deve ter duracao minima de 24 hora
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario

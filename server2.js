var express = require("express")
var Sequelize = require("sequelize")

//connect to mysql database
//baza de date, username, password
var sequelize = new Sequelize('myApp', 'andreea', 'pass', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
}).catch( function(err) {
    console.log(err)
})

//define a new Model

var Sejururi = sequelize.define('sejururi', {
    titlu: Sequelize.STRING,
    destinatie: Sequelize.STRING,
    pret: Sequelize.INTEGER,
    durata: Sequelize.INTEGER,
    link: Sequelize.STRING
})


var Vouchere = sequelize.define('vouchere', {
    id_sejur: Sequelize.INTEGER,
    valoare: Sequelize.INTEGER,
    end_date: Sequelize.DATE,
    status: Sequelize.INTEGER
})


var app = express()

//access static files
app.use(express.static('public'))
app.use('/admin', express.static('admin'))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/createdb', (request, response) => {
    sequelize.sync({force: true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        response.status(500).send('could not create tables')
    })
})

app.get('/createdata', (req, res) => {
    //TODO add some test data here
})

async function getSejururi(request, response) {
    try {
        let sejururi = await Sejururi.findAll();
        response.status(200).json(sejururi)
    } catch(err) {
        response.status(500).send('something bad happened')
    }
}

async function getSejururiById(request, response) {
    try {
        let sejururi = await Sejururi.findAll();
        response.status(200).json(sejururi)
    } catch(err) {
        response.status(500).send('something bad happened')
    }
}


async function getVouchere(request, response) {
    try {
        let vouchere = await Vouchere.findAll();
        response.status(200).json(vouchere)
    } catch(err) {
        response.status(500).send('something bad happened')
    }
}


app.get('/vouchere', getVouchere)


app.get('/vouchere/:id', function(request, response) {
    Vouchere.findOne({where: {id:request.params.id}}).then(function(voucher) {
        if(voucher) {
            response.status(200).send(voucher)
        } else {
            response.status(404).send()
        }
    })
})

//create a new category
app.post('/vouchere', function(request, response) {
    Vouchere.create(request.body).then(function(voucher) {
        response.status(201).send(voucher)
    })
})

app.put('/vouchere/:id', function(request, response) {
    console.log(request.body);
    Vouchere.findByPk(request.params.id).then(function(voucher) {
        if(voucher) {
            voucher.update(request.body).then(function(voucher){
                response.status(201).send(voucher)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})


app.delete('/vouchere/:id', function(request, response) {
    Vouchere.findByPk(request.params.id).then(function(voucher) {
        if(voucher) {
            voucher.destroy().then(function(){
            response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})


//finished vouchers



// get a list of categories
app.get('/sejururi', getSejururi)

// get one category by id
app.get('/sejururi/:id', function(request, response) {
    if(isNaN(request.params.id)){
        Sejururi.findAll({where: {destinatie:request.params.id}}).then(function(sejur) {
            if(sejur) {
                response.status(200).send(sejur)
            } else {
                response.status(404).send()
            }
        })
    }else{
        Sejururi.findOne({where: {id:request.params.id}}).then(function(sejur) {
            if(sejur) {
                response.status(200).send(sejur)
            } else {
                response.status(404).send()
            }
        })
    }
})


/*app.get('/sejururi/:destinatie', function(request, response) {
    Sejururi.findAll({where: {destinatie:request.params.destinatie}}).then(function(sejur) {
        if(sejur) {
            response.status(200).send(sejur)
        } else {
            response.status(404).send()
        }
    })
})*/


//create a new category
app.post('/sejururi', function(request, response) {

    Sejururi.create(request.body).then(function(sejur) {
        response.status(201).send(sejur)
    })
})

app.put('/sejururi/:id', function(request, response) {
    console.log("Update");
    Sejururi.findByPk(request.params.id).then(function(sejur) {
        if(sejur) {
            sejur.update(request.body).then(function(sejur){
                response.status(201).send(sejur)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})


app.delete('/sejururi/:id', function(request, response) {
    Sejururi.findByPk(request.params.id).then(function(sejur) {
        if(sejur) {
            sejur.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.listen(8080)

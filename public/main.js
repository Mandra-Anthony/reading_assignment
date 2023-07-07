app.use(express.static('public'))
const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader',
      quote: 'I find your lack of faith disturbing.',
    }),
  })
})

app.use(bodyParser.json())

app.put('/quotes', function(req, res) {
  console.log(req.body)
  quotesCollection.findOneAndUpdate({ name: 'Yoda' },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote,
      },
    },
    {
      upsert: true,
     }
  ) 
  .then(result => {
     console.log(result)
   })
  .catch(error => console.error(error))
})

const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {
      window.location.reload()
    })
})

app.delete('/quotes', (req, res) => {
  quotesCollection
    .deleteOne({ name: req.body.name })
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No quote to delete')
      }
      res.json(`Deleted Darth Vader's quote`) 
    })
  .catch(error => console.error(error))
})




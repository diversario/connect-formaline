
# Connect Formaline

Connect Formaline is a multipart / urlencoded form parsing middleware utilizing [node-formaline](https://github.com/rootslab/formaline).

## Installation

via npm (not submitted yet):

	$ npm install connect-formaline

## Example

    var form = require('connect-form');
    
    connect(
      formaline({/* empty config object */}),
      function(req, res){
        if (req.method == 'POST'){
          var workWithFiles = function(json, res){
            /* work with uploaded files here */
          }
          
          req.form.on( 'loadend', function(json, res){
            workWithFiles(json, res);
            resn.end(); // end response and work with files
          });
          
        }
      })
    .listen(3000);

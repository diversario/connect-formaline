
# Connect Formaline

Connect Formaline is a multipart / urlencoded form parsing middleware utilizing [node-formaline](https://github.com/rootslab/formaline).

## Installation

via npm (not submitted yet):

	$ npm install connect-form

## Example (invalid)

    var form = require('connect-form');
    var server = connect.createServer(
	    form({ keepExtensions: true }),
	    function(req, res, next){
		    // Form was submitted
	        if (req.form) {
		        // Do something when parsing is finished
		        // and respond, or respond immediately
		        // and work with the files.
	            req.form.complete(function(err, fields, files){
	                res.writeHead(200, {});
	                if (err) res.write(JSON.stringify(err.message));
	                res.write(JSON.stringify(fields));
	                res.write(JSON.stringify(files));
	                res.end();
	            });
	        // Regular request, pass to next middleware
	        } else {
	            next();
	        }
	    }
	);
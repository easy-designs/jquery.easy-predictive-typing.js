/*! (c) Aaron Gustafson (@AaronGustafson). MIT License. http://github.com/easy-designs/jquery.easy-predictive-typing.js */

/* Predictive Typing API
 * 
 * This script enables the dynamic creation of datalists using an API endpoint.
 * To set it up, declare the API endpoint in the field:
 * 
 *  - The data-predictive-endpoint attribute
 * 	  A URL to the JSON endpoint
 *  - The data-predictive-method attribute
 * 	  post or get (default: get)
 *  - The data-predictive-var-name attribute
 * 	  The variable name you want the value sent as (default: query)
 * 
 * Example(s):
 * 
 * 	<input type="text" name="something"
 * 		data-predictive-endpoint="/foo/bar"/>
 * 	<!-- GET: /foo/bar?query=WHAT THE USER TYPED -->
 * 
 * 	<input type="text" name="something"
 * 		data-predictive-endpoint="/foo/bar"
 * 		data-predictive-method="post"/>
 * 	<!-- POST: /foo/bar { "query": "WHAT THE USER TYPED" } -->
 * 
 * 	<input type="text" name="something"
 * 		data-predictive-endpoint="/foo/bar"
 * 		data-predictive-var-name="my_custom_var"/>
 * 	<!-- GET: /foo/bar?my_custom_var=WHAT THE USER TYPED -->
 * 
 * 
 * The JSON response should follow this format:
 * 
 * {
 * 		"options": [
 * 			"option 1",
 * 			"option 2",
 * 			"option 3"
 * 		]
 * }
 * 
 **/

;(function(){
	
	var PREDICTIVE = 'predictive-',
		ENDPOINT = PREDICTIVE + 'endpoint',
		UUID = PREDICTIVE + ( new Date() ).getTime() + '-',
		allowed_methods = [ 'get', 'post' ],
		$datalist = $('<datalist/>'),
		$option = $('<option/>'),
		$body = $('body');
	
	// find our inputs
	$('input[data-' + ENDPOINT + ']')
		
		// loop & create the datalists
		.each(function( i ){
		
			var id = UUID + i;
			
			// make the datalist
			$datalist.clone()
				.attr( 'id', id )
				.appendTo( $body );
			
			// set the datalist relationship
			$(this).attr( 'list', id );

		 })
		
		// set the onclick handler
		.on( 'keyup', function( e ){
			
			var $input = $(this),
				$dl = $('#' + $input.attr('list') ),
				endpoint = $input.data( ENDPOINT ),
				variable = $input.data( PREDICTIVE + 'var-name' ) || 'query',
				method = $input.data( PREDICTIVE + 'method' ),
				val = $input.val(),
				key = e.which,
				obj = {};
				
			if ( $.inArray( method, allowed_methods ) < 0 )
			{
				method = allowed_methods[0];
			}
			
			obj[variable] = val;
			
			if ( key != 38 &&
				 key != 40 &&
				 key != 9 &&
				 key != 13 )
			{
				$[method]( endpoint, obj, function( data ){
					
					if ( data.options &&
						 data.options instanceof Array )
					{

						// empty the list
						$dl.empty();

						// loop the options
						$( data.options ).each(function( i, val ){
							
							// make an option and add it to the list
							$dl.append(
								$option.clone()
									.val( val )
									.text( val )
							);
							
						});
						
						// send a signal in case someone’s using a polyfill
						$dl.trigger('update');

					}
					
				}, 'json');
			}
			
		 });

})();

jquery.easy-predictive-typing.js
================================

A simple, declarative implementation of predictive typing with Ajax &amp; HTML5 datalists.

The API
-------

This script enables the dynamic creation of datalists using an API endpoint. To set it up, declare the API endpoint in the field:

 - The `data-predictive-endpoint` attribute
	  A URL to the JSON endpoint
 - The `data-predictive-method` attribute
	  post or get (default: get)
 - The `data-predictive-var-name` attribute
	  The variable name you want the value sent as (default: query)

Example(s):

	<input type="text" name="something"
		data-predictive-endpoint="/foo/bar"/>
	<!-- GET: /foo/bar?query=WHAT THE USER TYPED -->

	<input type="text" name="something"
		data-predictive-endpoint="/foo/bar"
		data-predictive-method="post"/>
	<!-- POST: /foo/bar { "query": "WHAT THE USER TYPED" } -->

	<input type="text" name="something"
		data-predictive-endpoint="/foo/bar"
		data-predictive-var-name="my_custom_var"/>
	<!-- GET: /foo/bar?my_custom_var=WHAT THE USER TYPED -->


The JSON response should follow this format:

	{
		"options": [
			"option 1",
			"option 2",
			"option 3"
		]
	}
(function( window ) {

var OrgDate, state;

function getPreviousTests( rTestName, rModuleName ) {
	var testSpan, moduleSpan,
		matches = [],
		i = 0,
		rModule = /(^| )module-name( |$)/,
		testNames = typeof document.getElementsByClassName !== "undefined" ?
			document.getElementsByClassName( "test-name" ) :
			(function( spans ) {
				var span,
					tests = [],
					i = 0,
					rTest = /(^| )test-name( |$)/;
				for ( ; ( span = spans[ i ] ); i++ ) {
					if ( rTest.test( span.className ) ) {
						tests.push( span );
					}
				}
				return tests;
			})( document.getElementsByTagName( "span" ) );

	for ( ; ( testSpan = testNames[ i ] ); i++ ) {
		moduleSpan = testSpan;
		while ( ( moduleSpan = moduleSpan.previousSibling ) ) {
			if ( rModule.test( moduleSpan.className ) ) {
				break;
			}
		}
		if ( ( !rTestName || rTestName.test( testSpan.innerHTML ) ) &&
			( !rModuleName || moduleSpan && rModuleName.test( moduleSpan.innerHTML ) ) ) {

			while ( ( testSpan = testSpan.parentNode ) ) {
				if ( testSpan.nodeName.toLowerCase() === "li" ) {
					matches.push( testSpan );
				}
			}
		}
	}
	return matches;
}

QUnit.test( "module without setup/teardown (default)", function( assert ) {
	assert.expect( 1 );
	assert.ok( true );
});

QUnit.test( "expect in test", function( assert ) {
	assert.expect( 3 );
	assert.ok( true );
	assert.ok( true );
	assert.ok( true );
});

QUnit.test( "expect in test", function( assert ) {
	assert.expect( 1 );
	assert.ok( true );
});

QUnit.test( "expect query and multiple issue", function( assert ) {
	assert.expect( 2 );
	assert.ok( true );
	var expected = assert.expect();
	assert.equal( expected, 2 );
	assert.expect( expected + 1 );
	assert.ok( true );
});

QUnit.module( "setup test", {
	setup: function( assert ) {
		assert.ok( true );
	}
});

QUnit.test( "module with setup", function( assert ) {
	assert.expect( 2 );
	assert.ok( true );
});

QUnit.test( "module with setup, expect in test call", function( assert ) {
	assert.expect( 2 );
	assert.ok( true );
});

// TODO: More to the html-reporter test once we have that.
if ( typeof document !== "undefined" ) {

	QUnit.module( "<script id='qunit-unescaped-module'>'module';</script>", {
		setup: function() {
		},
		teardown: function( assert ) {

			// We can't use ok(false) inside script tags since some browsers
			// don't evaluate script tags inserted through innerHTML after domready.
			// Counting them before/after doesn't cover everything either as qunit-modulefilter
			// is created before any test is ran. So use ids instead.
			if ( document.getElementById( "qunit-unescaped-module" ) ) {

				// This can either be from in #qunit-modulefilter or #qunit-testresult
				assert.ok( false, "Unescaped module name" );
			}
			if ( document.getElementById( "qunit-unescaped-test" ) ) {
				assert.ok( false, "Unescaped test name" );
			}
			if ( document.getElementById( "qunit-unescaped-assertion" ) ) {
				assert.ok( false, "Unescaped test name" );
			}
		}
	});

	QUnit.test( "<script id='qunit-unescaped-test'>'test';</script>", function( assert ) {
		assert.expect( 1 );
		assert.ok( true, "<script id='qunit-unescaped-asassertionsert'>'assertion';</script>" );
	});
}

QUnit.module( "setup/teardown test", {
	setup: function( assert ) {
		state = true;
		assert.ok( true );

		// Assert that we can introduce and delete globals in setup/teardown
		// without noglobals sounding any alarm.

		// Using an implied global variable instead of explicit window property
		// because there is no way to delete a window.property in IE6-8
		// `delete x` only works for `x = 1, and `delete window.x` throws exception.
		// No one-code fits all solution possible afaic. Resort to @cc.

		/*@cc_on
			@if (@_jscript_version < 9)
				x = 1;
			@else @*/
				window.x = 1;
			/*@end
		@*/
	},
	teardown: function( assert ) {
		assert.ok( true );

		/*@cc_on
			@if (@_jscript_version < 9)
				delete x;
			@else @*/
				delete window.x;
			/*@end
		@*/
	}
});

QUnit.test( "module with setup/teardown", function( assert ) {
	assert.expect( 3 );
	assert.ok( true );
});

QUnit.module( "setup/teardown test 2" );

QUnit.test( "module without setup/teardown", function( assert ) {
	assert.expect( 1 );
	assert.ok( true );
});

QUnit.module( "Date test", {
	setup: function( assert ) {
		OrgDate = Date;
		window.Date = function() {
			assert.ok(
				false,
				"QUnit should internally be independent from Date-related manipulation and testing"
			);
			return new OrgDate();
		};
	},
	teardown: function() {
		window.Date = OrgDate;
	}
});

QUnit.test( "sample test for Date test", function( assert ) {
	assert.expect( 1 );
	assert.ok( true );
});

if ( typeof setTimeout !== "undefined" ) {
state = "fail";

QUnit.module( "teardown and stop", {
	teardown: function( assert ) {
		assert.equal( state, "done", "Test teardown." );
	}
});

QUnit.test( "teardown must be called after test ended", function( assert ) {
	assert.expect( 1 );
	QUnit.stop();
	setTimeout(function() {
		state = "done";
		QUnit.start();
	}, 13 );
});

QUnit.test( "parameter passed to stop increments semaphore n times", function( assert ) {
	assert.expect( 1 );
	QUnit.stop( 3 );
	setTimeout(function() {
		state = "not enough starts";
		QUnit.start();
		QUnit.start();
	}, 13 );
	setTimeout(function() {
		state = "done";
		QUnit.start();
	}, 15 );
});

QUnit.test( "parameter passed to start decrements semaphore n times", function( assert ) {
	assert.expect( 1 );
	QUnit.stop();
	QUnit.stop();
	QUnit.stop();
	setTimeout(function() {
		state = "done";
		QUnit.start( 3 );
	}, 18 );
});

QUnit.module( "async setup test", {
	setup: function( assert ) {
		QUnit.stop();
		setTimeout(function() {
			assert.ok( true );
			QUnit.start();
		}, 500 );
	}
});

QUnit.asyncTest( "module with async setup", function( assert ) {
	assert.expect( 2 );
	assert.ok( true );
	QUnit.start();
});

QUnit.module( "async teardown test", {
	teardown: function( assert ) {
		QUnit.stop();
		setTimeout(function() {
			assert.ok( true );
			QUnit.start();
		}, 500 );
	}
});

QUnit.asyncTest( "module with async teardown", function( assert ) {
	assert.expect( 2 );
	assert.ok( true );
	QUnit.start();
});

QUnit.module( "asyncTest" );

QUnit.asyncTest( "asyncTest", function( assert ) {
	assert.expect( 2 );
	assert.ok( true );
	setTimeout(function() {
		state = "done";
		assert.ok( true );
		QUnit.start();
	}, 13 );
});

QUnit.asyncTest( "asyncTest with expect()", function( assert ) {
	assert.expect( 2 );
	assert.ok( true );
	setTimeout(function() {
		state = "done";
		assert.ok( true );
		QUnit.start();
	}, 13 );
});

QUnit.test( "sync", function( assert ) {
	assert.expect( 2 );
	QUnit.stop();
	setTimeout(function() {
		assert.ok( true );
		QUnit.start();
	}, 13 );
	QUnit.stop();
	setTimeout(function() {
		assert.ok( true );
		QUnit.start();
	}, 125 );
});

QUnit.test( "test synchronous calls to stop", function( assert ) {
	assert.expect( 2 );
	QUnit.stop();
	setTimeout(function() {
		assert.ok( true, "first" );
		QUnit.start();
		QUnit.stop();
		setTimeout(function() {
			assert.ok( true, "second" );
			QUnit.start();
		}, 150 );
	}, 150 );
});
}

QUnit.module( "save scope", {
	setup: function() {
		this.foo = "bar";
	},
	teardown: function( assert ) {
		assert.deepEqual( this.foo, "bar" );
	}
});

QUnit.test( "scope check", function( assert ) {
	assert.expect( 2 );
	assert.deepEqual( this.foo, "bar" );
});

QUnit.module( "simple testEnvironment setup", {
	foo: "bar",
	// example of meta-data
	bugid: "#5311"
});

QUnit.test( "scope check", function( assert ) {
	assert.deepEqual( this.foo, "bar" );
});

QUnit.test( "modify testEnvironment", function( assert ) {
	assert.expect( 0 );
	this.foo = "hamster";
});

QUnit.test( "testEnvironment reset for next test", function( assert ) {
	assert.deepEqual( this.foo, "bar" );
});

QUnit.module( "testEnvironment with object", {
	options: {
		recipe: "soup",
		ingredients: [ "hamster", "onions" ]
	}
});

QUnit.test( "scope check", function( assert ) {
	assert.deepEqual( this.options, {
		recipe: "soup",
		ingredients: [ "hamster", "onions" ]
	});
});

QUnit.test( "modify testEnvironment", function( assert ) {
	assert.expect( 0 );

	// since we only do a shallow copy, nested children of testEnvironment can be modified
	// and survice
	this.options.ingredients.push( "carrots" );
});

QUnit.test( "testEnvironment reset for next test", function( assert ) {
	assert.deepEqual( this.options, {
		recipe: "soup",
		ingredients: [ "hamster", "onions", "carrots" ]
	}, "Is this a bug or a feature? Could do a deep copy" );
});

QUnit.module( "testEnvironment tests" );

function makeurl() {
	var testEnv = QUnit.config.current.testEnvironment,
		url = testEnv.url || "http://example.com/search",
		q = testEnv.q || "a search test";
	return url + "?q=" + encodeURIComponent( q );
}

QUnit.test( "makeurl working", function( assert ) {
	assert.expect( 2 );
	assert.equal(
		QUnit.config.current.testEnvironment,
		this,
		"The current testEnvironment QUnit.config"
	);
	assert.equal(
		makeurl(),
		"http://example.com/search?q=a%20search%20test",
		"makeurl returns a default url if nothing specified in the testEnvironment"
	);
});

QUnit.module( "testEnvironment with makeurl settings", {
	url: "http://google.com/",
	q: "another_search_test"
});

QUnit.test( "makeurl working with settings from testEnvironment", function( assert ) {
	assert.equal(
		makeurl(),
		"http://google.com/?q=another_search_test",
		"rather than passing arguments, we use test metadata to from the url"
	);
});

QUnit.module( "dump" );

QUnit.test( "dump output", function( assert ) {
	assert.equal( QUnit.dump.parse( [ 1, 2 ] ), "[\n  1,\n  2\n]" );
	assert.equal( QUnit.dump.parse( { top: 5, left: 0 } ), "{\n  \"left\": 0,\n  \"top\": 5\n}" );
	if ( typeof document !== "undefined" && document.getElementById( "qunit-header" ) ) {
		assert.equal(
			QUnit.dump.parse( document.getElementById( "qunit-header" ) ),
			"<h1 id=\"qunit-header\"></h1>"
		);
		assert.equal(
			QUnit.dump.parse( document.getElementsByTagName( "h1" ) ),
			"[\n  <h1 id=\"qunit-header\"></h1>\n]"
		);
	}
});

QUnit.test( "dump, TypeError properties", function( assert ) {
	function CustomError( message ) {
		this.message = message;
	}

	CustomError.prototype.toString = function() {
		return this.message;
	};
	var customError = new CustomError( "sad puppy" ),
		typeError = new TypeError( "crying kitten" ),
		expectedCustomMessage = "\"message\": \"sad puppy\"",
		expectedTypeMessage = "\"message\": \"crying kitten\"",
		expectedTypeName = "\"name\": \"TypeError\"",

		dumpedCustomError = QUnit.dump.parse( customError ),
		dumpedTypeError = QUnit.dump.parse( typeError ),

		dumpedTypeErrorWithEnumerable;

	// Test when object has some enumerable properties by adding one
	typeError.hasCheeseburger = true;

	dumpedTypeErrorWithEnumerable = QUnit.dump.parse( typeError );

	assert.push(
			dumpedCustomError.indexOf(expectedCustomMessage) >= 0,
			dumpedCustomError,
			expectedCustomMessage,
			"custom error contains message field" );
	assert.push(
			dumpedTypeError.indexOf(expectedTypeMessage) >= 0,
			dumpedTypeError,
			expectedTypeMessage,
			"type error contains message field" );
	assert.push(
			dumpedTypeError.indexOf(expectedTypeName) >= 0,
			dumpedTypeError,
			expectedTypeName,
			"type error contains name field" );
	assert.push(
			dumpedTypeErrorWithEnumerable.indexOf(expectedTypeMessage) >= 0,
			dumpedTypeErrorWithEnumerable,
			expectedTypeMessage,
			"type error with enumerable field contains message field" );
});

QUnit.module( "assertions" );

QUnit.test( "propEqual", function( assert ) {
	assert.expect( 5 );
	var objectCreate = Object.create || function( origin ) {
		function O() {}
		O.prototype = origin;
		var r = new O();
		return r;
	};

	function Foo( x, y, z ) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	Foo.prototype.doA = function() {};
	Foo.prototype.doB = function() {};
	Foo.prototype.bar = "prototype";

	function Bar() {
	}
	Bar.prototype = objectCreate( Foo.prototype );
	Bar.prototype.constructor = Bar;

	assert.propEqual(
		new Foo( 1, "2", [] ),
		{
			x: 1,
			y: "2",
			z: []
		}
	);

	assert.notPropEqual(
		new Foo( "1", 2, 3 ),
		{
			x: 1,
			y: "2",
			z: 3
		},
		"Primitive values are strictly compared"
	);

	assert.notPropEqual(
		new Foo( 1, "2", [] ),
		{
			x: 1,
			y: "2",
			z: {}
		},
		"Array type is preserved"
	);

	assert.notPropEqual(
		new Foo( 1, "2", {} ),
		{
			x: 1,
			y: "2",
			z: []
		},
		"Empty array is not the same as empty object"
	);

	assert.propEqual(
		new Foo( 1, "2", new Foo( [ 3 ], new Bar(), null ) ),
		{
			x: 1,
			y: "2",
			z: {
				x: [ 3 ],
				y: {},
				z: null
			}
		},
		"Complex nesting of different types, inheritance and constructors"
	);
});

QUnit.test( "throws", function( assert ) {
	assert.expect( 16 );
	function CustomError( message ) {
		this.message = message;
	}

	CustomError.prototype.toString = function() {
		return this.message;
	};

	assert.throws(
		function() {
			throw "my error";
		}
	);

	assert.throws(
		function() {
			throw "my error";
		},
		"simple string throw, no 'expected' value given"
	);

	// This test is for IE 7 and prior which does not properly
	// implement Error.prototype.toString
	assert.throws(
		function() {
			throw new Error( "error message" );
		},
		/error message/,
		"use regexp against instance of Error"
	);

	assert.throws(
		function() {
			throw new TypeError();
		},
		Error,
		"thrown TypeError without a message is an instance of Error"
	);

	assert.throws(
		function() {
			throw new TypeError();
		},
		TypeError,
		"thrown TypeError without a message is an instance of TypeError"
	);

	assert.throws(
		function() {
			throw new TypeError( "error message" );
		},
		Error,
		"thrown TypeError with a message is an instance of Error"
	);

	// This test is for IE 8 and prior which goes against the standards
	// by considering that the native Error constructors, such TypeError,
	// are also instances of the Error constructor. As such, the assertion
	// sometimes went down the wrong path.
	assert.throws(
		function() {
			throw new TypeError( "error message" );
		},
		TypeError,
		"thrown TypeError with a message is an instance of TypeError"
	);

	assert.throws(
		function() {
			throw new CustomError( "some error description" );
		},
		CustomError,
		"thrown error is an instance of CustomError"
	);

	assert.throws(
		function() {
			throw new Error( "some error description" );
		},
		/description/,
		"use a regex to match against the stringified error"
	);

	assert.throws(
		function() {
			throw new Error( "foo" );
		},
		new Error( "foo" ),
		"thrown error object is similar to the expected Error object"
	);

	assert.throws(
		function() {
			throw new CustomError( "some error description" );
		},
		new CustomError( "some error description" ),
		"thrown error object is similar to the expected CustomError object"
	);

	assert.throws(
		function() {
			throw {
				name: "SomeName",
				message: "some message"
			};
		},
		{ name: "SomeName", message: "some message" },
		"thrown error object is similar to the expected plain object"
	);

	assert.throws(
		function() {
			throw new CustomError( "some error description" );
		},
		function( err ) {
			return err instanceof CustomError && /description/.test( err );
		},
		"custom validation function"
	);

	assert.throws(
		function() {

			/*jshint ignore:start */
			( window.execScript || function( data ) {
				window.eval.call( window, data );
			})( "throw 'error';" );

			/*jshint ignore:end */
		},
		"globally-executed errors caught"
	);

	this.CustomError = CustomError;

	assert.throws(
		function() {
			throw new this.CustomError( "some error description" );
		},
		/description/,
		"throw error from property of 'this' context"
	);

	assert.throws(
		function() {
			throw "some error description";
		},
		"some error description",
		"handle string typed thrown errors"
	);
});

if ( typeof document !== "undefined" ) {

QUnit.module( "fixture" );

QUnit.test( "setup", function( assert ) {
	assert.expect( 0 );
	document.getElementById( "qunit-fixture" ).innerHTML = "foobar";
});

QUnit.test( "basics", function( assert ) {
	assert.equal(
		document.getElementById( "qunit-fixture" ).innerHTML,
		"test markup",
		"automatically reset"
	);
});

QUnit.test( "running test name displayed", function( assert ) {
	assert.expect( 2 );

	var displaying = document.getElementById( "qunit-testresult" );

	assert.ok( /running test name displayed/.test( displaying.innerHTML ),
		"Expect test name to be found in displayed text"
	);
	assert.ok( /fixture/.test( displaying.innerHTML ),
		"Expect module name to be found in displayed text"
	);
});

(function() {
	var delayNextSetup,
		sleep = function( n ) {
			QUnit.stop();
			setTimeout( function() { QUnit.start(); }, n );
		};

	QUnit.module( "timing", {
		setup: function() {
			if ( delayNextSetup ) {
				delayNextSetup = false;
				sleep( 250 );
			}
		}
	});

	QUnit.test( "setup", function( assert ) {
		assert.expect( 0 );
		delayNextSetup = true;
	});

	QUnit.test( "basics", function( assert ) {
		assert.expect( 2 );
		var previous = getPreviousTests( /^setup$/, /^timing$/ )[ 0 ],
			runtime = previous.lastChild.previousSibling;
		assert.ok( /(^| )runtime( |$)/.test( runtime.className ), "Runtime element exists" );
		assert.ok( /^\d+ ms$/.test( runtime.innerHTML ), "Runtime reported in ms" );
	});

	QUnit.test( "values", function( assert ) {
		assert.expect( 2 );
		var basics = getPreviousTests( /^setup$/, /^timing$/ )[ 0 ],
			slow = getPreviousTests( /^basics$/, /^timing$/ )[ 0 ];
		assert.ok( parseInt( basics.lastChild.previousSibling.innerHTML, 10 ) < 50,
			"Fast runtime for trivial test"
		);
		assert.ok( parseInt( slow.lastChild.previousSibling.innerHTML, 10 ) > 250,
			"Runtime includes setup"
		);
	});
})();

}

QUnit.module( "custom assertions" );

QUnit.assert.mod2 = function( value, expected, message ) {
	var actual = value % 2;
	this.push( actual === expected, actual, expected, message );
};

QUnit.test( "mod2", function( assert ) {
	assert.expect( 2 );

	assert.mod2( 2, 0, "2 % 2 == 0" );
	assert.mod2( 3, 1, "3 % 2 == 1" );
});

QUnit.module( "recursions" );

function Wrap( x ) {
	this.wrap = x;
	if ( x === undefined ) {
		this.first = true;
	}
}

function chainwrap( depth, first, prev ) {
	depth = depth || 0;
	var last = prev || new Wrap();
	first = first || last;

	if ( depth === 1 ) {
		first.wrap = last;
	}
	if ( depth > 1 ) {
		last = chainwrap( depth - 1, first, new Wrap( last ) );
	}

	return last;
}

QUnit.test( "Check dump recursion", function( assert ) {
	assert.expect( 4 );

	var noref, nodump, selfref, selfdump, parentref, parentdump, circref, circdump;

	noref = chainwrap( 0 );
	nodump = QUnit.dump.parse( noref );
	assert.equal( nodump, "{\n  \"first\": true,\n  \"wrap\": undefined\n}" );

	selfref = chainwrap( 1 );
	selfdump = QUnit.dump.parse( selfref );
	assert.equal( selfdump, "{\n  \"first\": true,\n  \"wrap\": recursion(-1)\n}" );

	parentref = chainwrap( 2 );
	parentdump = QUnit.dump.parse( parentref );
	assert.equal( parentdump,
		"{\n  \"wrap\": {\n    \"first\": true,\n    \"wrap\": recursion(-2)\n  }\n}"
	);

	circref = chainwrap( 10 );
	circdump = QUnit.dump.parse( circref );
	assert.ok( new RegExp( "recursion\\(-10\\)" ).test( circdump ),
		"(" + circdump + ") should show -10 recursion level"
	);
});

QUnit.test( "Check equal/deepEqual recursion", function( assert ) {
	var noRecursion, selfref, circref;

	noRecursion = chainwrap( 0 );
	assert.equal( noRecursion, noRecursion, "I should be equal to me." );
	assert.deepEqual( noRecursion, noRecursion, "... and so in depth." );

	selfref = chainwrap( 1 );
	assert.equal( selfref, selfref, "Even so if I nest myself." );
	assert.deepEqual( selfref, selfref, "... into the depth." );

	circref = chainwrap( 10 );
	assert.equal( circref, circref, "Or hide that through some levels of indirection." );
	assert.deepEqual( circref, circref, "... and checked on all levels!" );
});

QUnit.test( "Circular reference with arrays", function( assert ) {
	var arr, arrdump, obj, childarr, objdump, childarrdump;

	// pure array self-ref
	arr = [];
	arr.push( arr );

	arrdump = QUnit.dump.parse( arr );

	assert.equal( arrdump, "[\n  recursion(-1)\n]" );
	assert.equal( arr, arr[ 0 ], "no endless stack when trying to dump arrays with circular ref" );

	// mix obj-arr circular ref
	obj = {};
	childarr = [ obj ];
	obj.childarr = childarr;

	objdump = QUnit.dump.parse( obj );
	childarrdump = QUnit.dump.parse( childarr );

	assert.equal( objdump, "{\n  \"childarr\": [\n    recursion(-2)\n  ]\n}" );
	assert.equal( childarrdump, "[\n  {\n    \"childarr\": recursion(-2)\n  }\n]" );

	assert.equal( obj.childarr, childarr,
		"no endless stack when trying to dump array/object mix with circular ref"
	);
	assert.equal( childarr[ 0 ], obj,
		"no endless stack when trying to dump array/object mix with circular ref"
	);

});

QUnit.test( "Circular reference - test reported by soniciq in #105", function( assert ) {
	var a, b, barr,
		MyObject = function() {};
	MyObject.prototype.parent = function( obj ) {
		if ( obj === undefined ) {
			return this._parent;
		}
		this._parent = obj;
	};
	MyObject.prototype.children = function( obj ) {
		if ( obj === undefined ) {
			return this._children;
		}
		this._children = obj;
	};

	a = new MyObject();
	b = new MyObject();

	barr = [ b ];
	a.children( barr );
	b.parent( a );

	assert.equal( a.children(), barr );
	assert.deepEqual( a.children(), [ b ] );
});

// Get a reference to the global object, like window in browsers
}( (function() {
	return this;
}.call()) ));

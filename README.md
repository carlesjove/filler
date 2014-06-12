filler
======

A fucking JavaScript text filler. Cool for early stages of web development when you just need Lorem Ipsum and the kind.

## How to use

Filler is damn easy to use. Just include the script, init Filler with `var fllr = new Filler();` and use a `filler` attribute in any HTML element.

```
<!DOCTYPE html>
<html dir="ltr" lang="en">
	<head>
		<meta charset="utf-8">
		<title>My Site</title>
		<link rel="stylesheet" type="text/css" href="/assets/css/example.css">
	</head>
	<body>
		<header>
			<h1 filler="12"></h1>
		</header>
		
		<article>
			<h1 filler="20"></h1>
			<p filler="200"></p>
			<p filler="88"></p>
		</article>
		
		<footer>
			<p>What a footer!</p>
		</footer>

		<!-- Include Filler.js -->
		<script type="text/javascript" src="filler.js"></script>

		<!-- Init Filler.js using  -->
		<script>
			// That's for the default usage
			var fllr = new Filler();
		</script>
	</body>
</html>
```

## Parameters

`source`: Choose a source text
	
	- `lorem`: (default) Your beloved Lorem Ipsum
	- `pla`: A fragment of *El quadern gris*, one of the most acclaimed books by the catalan writer Josep Pla

`randomize`: (bool) Randomize the order of text, so every paragraph starts different. Default is false.

## License
What is a license?



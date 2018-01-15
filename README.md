<h1>My work template. Pug + stylus </h1>
<p align="center">
  <a href="https://github.com/vedees/word-template">
    <img width="70" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>
<p>
The template uses a Styl with Stylus syntax and project structure with source code in the directory build/ and production folder dev/, that contains ready project with optimized HTML, CSS, JS.
</p>

<h2>Gulp tasks:</h2>

<ul>
	<li><strong>gulp</strong>: default gulp task (pug, styl, js, browserSync) for web development;</li>
	<li><strong>build</strong>: build project to <strong>build</strong> folder (cleanup; optimize image(tinypng API), css, js, removing unnecessary files);</li>
	<li><strong>deploy</strong>: project deployment on the server from <strong>build</strong> folder via <strong>FTP</strong>;</li>
	<li><strong>cache</strong>: clear all gulp cache.</li>
</ul>

<h2>Installation:</h2>
<ol>
	<li>git clone https://github.com/vedees/work-template work-template</li>
	<li>cd work-template</li>
	<li>npm i</li>
  <li>gulp</li>
</ol>

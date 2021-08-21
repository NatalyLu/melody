const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const sync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const del= require("del");

// HTML
const html = () => {
  return gulp.src("*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("build"));
};
exports.html = html;

//Styles
const styles = () => {
  return gulp.src("less/style.less")
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(less())
  .pipe(postcss([autoprefixer()]))
  .pipe(gulp.dest("build/css"))
  .pipe(postcss([csso()]))
  .pipe(sourcemap.write("."))
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(sync.stream());
};
exports.styles = styles;

// Clean
const clean = () => {
  return del("build");
};
exports.clean = clean;

// Copy
const copy = (done) => {
  gulp.src("img/*.{jpg,png}", {
    base: ""
  })
  .pipe(gulp.dest("build/img"))
  done();
};
exports.copy = copy;

// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};
exports.server = server;

// Reload
const reload = done => {
  sync.reload();
  done();
};

// Watcher
const watcher = () => {
  gulp.watch("less/**/*.less", gulp.series(styles));
  gulp.watch("*.html", gulp.series(html, reload));
};

// Build
const build = gulp.series(
    clean,
    copy,
    gulp.parallel(
      styles,
      html,
    ),
);
exports.build = build;

// Default
exports.default = gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    html
  ),
  gulp.series(
    server,
    watcher
  )
);
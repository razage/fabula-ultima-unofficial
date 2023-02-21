import gulp from "gulp";
import less from "gulp-less";

const LESS_DEST = "./";
const LESS_SRC = "less/fabulaultima.less";
const LESS_WATCH = ["less/*.less"];

function compileLess() {
    return gulp.src(LESS_SRC).pipe(less()).pipe(gulp.dest(LESS_DEST));
}
export const compile = compileLess;

export function watchUpdates() {
    gulp.watch(LESS_WATCH, compile);
}

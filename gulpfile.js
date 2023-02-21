import gulp from "gulp";

import * as css from "./utils/css.js";

export default gulp.series(gulp.parallel(css.compile), css.watchUpdates);

export const buildCSS = gulp.series(css.compile);

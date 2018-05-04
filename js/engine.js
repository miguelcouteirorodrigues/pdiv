class Engine {
    constructor () {
        var debugTable;       
        var x;
        var y;
        var angle = 0;
        var counter = 0;
        var moveOnX = true;
        var moveOnY = true;
        var debug = false;
        var carAnalytics = true;
        var pause = false;
        var startMusic = true;
        var playMusic = true;

        var palmTreePositions = [];
        
        var bgMusic;
        var pauseMusic;

        var track;
        var bg;
        var car;
        var palmtree;

        var skidLeft;
        var skidRight;

        var imgData;

        this.initialize = function() {
            var canvas = document.getElementById("canvas");
            debugTable = document.getElementById("debug_table");
            canvas.width = 606;
            canvas.height = 453;
            x = 220;
            y = canvas.height / 8;
            var context = canvas.getContext('2d');

            bgMusic = new sound("background");
            pauseMusic = new sound("pause");

            track = new Track();
            bg = new Background();
            palmtree = new Palmtree(context);

            engine.addPalmTrees();

            animate(canvas, context);
        }

        var animate = function(canvas, context) {
            if (debug) {
                debugTable.style.display = "block";
            }
            else {
                debugTable.style.display = "none";
            }
            
            context.clearRect(0, 0, innerWidth, innerHeight);
            context.beginPath();

            car = new Car(context, x, y, angle);

            //render just the track and get the pixel data for the rotation point of the car
            track.drawTrack(context);
            imgData = context.getImageData(x, y, 1, 1);

            //clear the canvas and redraw elements in order: background, track, car, palmtrees
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            bg.drawBackground(context);
            track.drawTrack(context);
            car.draw(debug);

            for (var i = 0;i< palmTreePositions.length;i++) {
                palmtree.draw(palmTreePositions[i], debug);
            }            

            if (!pause) {
                if (counter <= 100) {
                    engine.renderCountdown(context, '48pt Arial', '3');
                }
                else if (counter <= 200) {
                    engine.renderCountdown(context, '72pt Arial', '2');
                }
                else if (counter <= 300) {
                    engine.renderCountdown(context, '96pt Arial', '1');
                }
                else {
                    if(playMusic) {
                        bgMusic.play();
                    }
                    else {
                        bgMusic.pause();
                    }
                    
                    engine.checkCollision(context);
                    
                    engine.checkTerrain();
                }
            }
            else {
                bgMusic.pause();
            }

            context.closePath();

            requestAnimationFrame(function() {
                animate(canvas, context);
            });

            if (debug) {
                console.log("counter: " + counter + "; x: " + x + "; y: " + y);
            }
            if (!pause) {
                counter++;
            }
        }

        this.renderCountdown = function(context, fontData, text) {
            context.save();
            context.fillStyle = "#ffffff";
            context.font = fontData;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(text, canvas.width / 2, canvas.height / 2);
            context.restore();
        }

        /**
         * Prevents the car from moving ouside the edges of the canvas.
         */
        this.checkCollision = function(context) {
            var _topLeft = new Point(Math.round(x + car.topLeft.x * Math.cos(angle - Math.atan(car.topLeft.y / car.topLeft.x))), 
            Math.round(y + car.topLeft.y * Math.sin(Math.PI / 2 + (angle - Math.atan(car.topLeft.y / car.topLeft.x)))), 0);

            var _topRight = new Point(Math.round(x + car.topRight.x * Math.cos(angle + Math.atan(car.topRight.y / car.topRight.x))),
            Math.round(y + car.topRight.y * Math.sin(Math.PI / 2 - (angle - Math.atan(car.topRight.y / car.topRight.x)))), 0);

            var _bottomLeft = new Point(Math.round(x + car.bottomLeft.x * Math.cos(angle - Math.atan(car.bottomLeft.y / car.bottomLeft.x))),
            0, 0);

            var _bottomRight = new Point(Math.round(x + car.bottomRight.x * Math.cos(angle + Math.atan(car.bottomRight.y / car.bottomRight.x))),
            0, 0);
            
            if (carAnalytics) {
                var _td_topleft_x = document.getElementById("top_left_table_x");
                _td_topleft_x.innerText = _topLeft.x;
                var _td_topleft_y = document.getElementById("top_left_table_y");
                _td_topleft_y.innerText = _topLeft.y;

                var _td_topright_x = document.getElementById("top_right_table_x");
                _td_topright_x.innerText = _topRight.x;
                var _td_topright_y = document.getElementById("top_right_table_y");
                _td_topright_y.innerText = _topRight.y;

                var _td_bottomleft_x = document.getElementById("bottom_left_table_x");
                _td_bottomleft_x.innerText = _bottomLeft.x;
                var _td_bottomleft_y = document.getElementById("bottom_left_table_y");
                _td_bottomleft_y.innerText = _bottomLeft.y;

                var _td_bottomright_x = document.getElementById("bottom_right_table_x");
                _td_bottomright_x.innerText = _bottomRight.x;
                var _td_bottomright_y = document.getElementById("bottom_right_table_y");
                _td_bottomright_y.innerText = _bottomRight.y;
            }

            //canvas edge collision
            if (_topRight.x >= context.canvas.width || _bottomRight.x >= context.canvas.width || _topRight.x <= 0 || _bottomRight.x <= 0) {
                moveOnX = false;
            }
            else {
                moveOnX = true;
            }

            //canvas edge collision
            if (y + Math.sin(angle) + car.topRight.y >= context.canvas.height
            || y + Math.sin(angle) + car.bottomRight.y >= context.canvas.height
            || y - Math.sin(angle) - car.topRight.y <= 0
            || y - Math.sin(angle) - car.bottomRight.y <= 0) {
                moveOnY = false;
            }
            else {
                moveOnY = true;
            }
        }

        /**
         * Checks if the rotation point of the car is on a transparent pixel.
         * If it is, reduces the movement speed
         */
        this.checkTerrain = function() {
            if (imgData.data[3] == 0) {
                if (moveOnX) {
                    x += Math.cos(angle) / 2;
                }
                else {
                    x -= Math.cos(angle) / 2;
                }

                if (moveOnY) {
                    y += Math.sin(angle) / 2;
                }
                else {
                    y -= Math.sin(angle) / 2;
                }
            }
            else {
                if (moveOnX) {
                    x += Math.cos(angle);
                }
                else {
                    x -= Math.cos(angle);
                }

                if (moveOnY) {
                    y += Math.sin(angle);
                }
                else {
                    y -= Math.sin(angle);
                }
            }
        }

        this.addPalmTrees = function() {
            palmTreePositions.push(new Point(100, 100, engine.getRandomInt(4,7)));
            palmTreePositions.push(new Point(515, 88, engine.getRandomInt(4,7)));
            palmTreePositions.push(new Point(130, 320, engine.getRandomInt(4,7)));
        }

        /**
         * Returns a random integer between min (inclusive) and max (inclusive)
         * Using Math.round() will give you a non-uniform distribution!
         */
        this.getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        window.addEventListener('keydown', function (event) {
            console.log("down: " + event.keyCode);
            
            // left
            if (event.keyCode == 37) {
                if (!pause) {
                    skidLeft = new sound("skid");
                    skidLeft.play();

                    if (imgData.data[3] == 0) {
                        angle -= Math.PI / 64;
                    }
                    else {
                        angle -= Math.PI / 32;
                    }
                }
            }

            // right
            if (event.keyCode == 39) {
                if (!pause) {
                    skidRight = new sound("skid");
                    skidRight.play();

                    if (imgData.data[3] == 0) {
                        angle += Math.PI / 64;
                    }
                    else {
                        angle += Math.PI / 32;
                    }
                }
            }

            // 1
            if (event.keyCode == 49) {
                debug = !debug;
                console.log("debug is " + debug);
            }

            // 2
            if (event.keyCode == 50) {
                carAnalytics = !carAnalytics;
            }

            // P
            if(event.keyCode == 80) {
                pause = !pause;
                pauseMusic.play();
            }

            // M
            if(event.keyCode == 77) {
                playMusic = !playMusic;
            }
        }, false);

        window.addEventListener('keyup', function (event) {
            console.log("up: " + event.keyCode);
            if (event.keyCode == 37) {
                skidLeft.stop("skid");
            }
            if (event.keyCode == 39) {
                skidRight.stop("skid");
            }
        }, false);
    }
}
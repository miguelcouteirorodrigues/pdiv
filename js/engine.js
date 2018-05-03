class Engine {
    constructor () {
        var x = 220;
        var y;
        var angle = 0;
        var counter = 0;
        var moveOnX = true;
        var moveOnY = true;
        var debug = false;
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

        this.initialize = function() {
            var canvas = document.getElementById("canvas");
            canvas.width = 606;
            canvas.height = 453;
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
            context.clearRect(0, 0, innerWidth, innerHeight);
            context.beginPath();

            car = new Car(context, x, y, angle);

            track.drawTrack(context);
            var imgData = context.getImageData(x, y, 1, 1);

            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            bg.drawBackground(context);
            track.drawTrack(context);
            car.draw(debug);

            //palmtree.draw(new Point(100, 100), 7);

            for (var i = 0;i< palmTreePositions.length;i++) {
                palmtree.draw(palmTreePositions[i]);
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
                else if (counter <= 200) {
                    engine.renderCountdown(context, '96pt Arial', '1');
                }
                else {
                    if(playMusic) {
                        bgMusic.play();
                    }
                    else {
                        bgMusic.pause();
                    }
                    
                    if (x + Math.cos(angle) + car.topRight.x >= context.canvas.width || x + Math.cos(angle) + car.bottomRight.x >= context.canvas.width || x + Math.cos(angle) - car.topRight.x <= 0 || x + Math.cos(angle) - car.bottomRight.x <= 0)
                    {
                        moveOnX = false;
                    }
                    else {
                        moveOnX = true;
                    }

                    if (y + Math.sin(angle) + car.topRight.x >= context.canvas.height || y + Math.sin(angle) + car.bottomRight.x >= context.canvas.height || y + Math.sin(angle) - car.topRight.x <= 0 || y + Math.sin(angle) - car.bottomRight.x <= 0)
                    {
                        moveOnY = false;
                    }
                    else {
                        moveOnY = true;
                    }
                    
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

        this.addPalmTrees = function() {
            palmTreePositions.push(new Point(100, 100, engine.getRandomInt(3,7)));
            palmTreePositions.push(new Point(520, 88, engine.getRandomInt(3,7)));
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
                    angle -= Math.PI / 16;
                }
            }

            // right
            if (event.keyCode == 39) {
                if (!pause) {
                    skidRight = new sound("skid");
                    skidRight.play();
                    angle += Math.PI / 16;
                }
            }

            // 1
            if (event.keyCode == 49) {
                debug = !debug;
                console.log("debug is " + debug);
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
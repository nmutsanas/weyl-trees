var config = {
    backgroundColor: 'rgb(88, 142, 235)',
    strokeColor: 'rgb(255,255,255)',
    strokeWidth: 2,
    stepsPerLevel: 30,
    strokeCap: 'round',
    nrElements: 4000,
    scaleFactor: 0.7071067811865475, // scale factor of 2^{-1/2}
    width: 400,
    irrationalIdx: 0
};

function Direction(x, y) {
    this.vector = new Point(x, y);
}

Direction.prototype.len = function (length) {
    return this.vector * Math.round(length);
};

directions = Object.freeze({
    NORTH: new Direction(0, 1),
    EAST: new Direction(1, 0),
    SOUTH: new Direction(0, -1),
    WEST: new Direction(-1, 0)
});

Direction.prototype.clockwise = [
    directions.NORTH,
    directions.EAST,
    directions.SOUTH,
    directions.WEST
];

Direction.prototype.turnRight = function () {
    var idx = this.clockwise.indexOf(this);
    return this.clockwise[(idx + 1) % 4];
};

Direction.prototype.turnLeft = function () {
    var idx = this.clockwise.indexOf(this);
    return this.clockwise[(idx + 3) % 4];
};

function LevelAndPoint(node, point, direction) {
    this.node = node;
    this.point = point;
    this.direction = direction;
}

anim = {};

drawWeylTree = function (irrational) {
    // background
    var rect = new Path.Rectangle({
        point: [0, 0],
        size: [view.size.width, view.size.height],
        strokeColor: config.strokeColor,
        selected: true
    });
    rect.sendToBack();
    rect.fillColor = config.backgroundColor;

    // labels
    var nameLabel = new PointText({
        point: view.center,
        justification: 'center',
        fontSize: 30,
        fillColor: config.strokeColor
    });
    nameLabel.position = new Point(config.width / 2, 30);
    nameLabel.content = irrational.name;

    var valueLabel = nameLabel.clone();
    valueLabel.position = new Point(config.width / 2, config.width - 30);
    valueLabel.content = irrational.value + "...";

    // center mark
    new Path.Circle({
        center: view.center,
        radius: 2,
        fillColor: config.strokeColor
    });

    var bst = irrational.makeBst(config.nrElements).root;

    var centerPoint = new Point(view.center);
    var branchLength = config.width / 4;
    var nextLevel = [];
    if (bst.left != null) {
        nextLevel.push(new LevelAndPoint(bst.left, centerPoint, directions.WEST));
    }
    if (bst.right != null) {
        nextLevel.push(new LevelAndPoint(bst.right, centerPoint, directions.EAST))
    }
    anim.currentLevel = nextLevel;
    anim.currentFinalLength = branchLength;
    anim.currentStep = Math.floor(anim.currentFinalLength / config.stepsPerLevel);
    anim.currentLength = anim.currentStep;
    view.play(); // start the animation
};

drawFrame = function () {
    var newLevel = [];
    anim.currentLevel.forEach(function (l) {
        var newEndpoint = l.point + l.direction.len(anim.currentLength);
        var line = new Path.Line(l.point, newEndpoint);
        var node = l.node;
        line.strokeColor = config.strokeColor;
        if (anim.currentLength == anim.currentFinalLength) {
            if (node.right != null) {
                newLevel.push(new LevelAndPoint(node.right, newEndpoint, l.direction.turnLeft()));
            }
            if (node.left != null) {
                newLevel.push(new LevelAndPoint(node.left, newEndpoint, l.direction.turnRight()));
            }
        }
    });
    if (newLevel.length > 0) {
        anim.currentLevel = newLevel;
        anim.currentFinalLength = Math.floor(anim.currentFinalLength * config.scaleFactor);
        anim.currentStep = Math.max(3, anim.currentFinalLength / config.stepsPerLevel);
        anim.currentLength = anim.currentStep;
    } else {
        anim.currentLength = Math.min(anim.currentLength + anim.currentStep, anim.currentFinalLength);
    }
};
view.pause();
drawWeylTree(IRRATIONALS_ARRAY[config.irrationalIdx]);
onFrame = function (event) {
    if (anim.currentFinalLength == 1 || anim.currentLevel.length == 0) {
        view.pause();
        console.log("finished");
    } else {
        drawFrame();
    }
};

function onMouseDown(event) {
    view.pause();
    project.getActiveLayer().clear();
    drawWeylTree(IRRATIONALS_ARRAY[++config.irrationalIdx % IRRATIONALS_ARRAY.length]);
    view.play();
}
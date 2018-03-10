var level = function() {


    this.level = null;
    

    this.update = function() {

        $('#level').text(this.level);

    }


    this.level = 0;
    return this;



    
};





level.prototype = {


    setLevel: function(level) {

        this.level = level;
        this.update();

    }
    
};
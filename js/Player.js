
class Player
{
    constructor()
    {
        this.dir = {
            LEFT: 2,        
            RIGHT: 3 }
        this.direction = this.dir.RIGHT;
        this.moveCount = 0;
        // row
        this.ship = [
            [37, 1],
            [38, 0],
            [38, 1],
            [38, 2] ];
        this.path = [ // [moves, dir]
            [1, 3], [1, 3], [1, 3], [1, 3], 
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2], 
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 2], [1, 2], [1, 2],
            [1, 3], [1, 3], [1, 3],
            [1, 3], [1, 3], [1, 3], 
            [1, 3], [1, 3], [1, 3],
            [1, 3], [1, 3], [1, 3],
            [1, 3], [1, 3], [1, 3],
            [1, 3], [1, 3], [1, 3],
            [1, 3], [1, 3], [1, 3],
            [1, 3], [1, 3], [1, 3],
            [1, 3], [1, 3], [1, 3],
            [1, 3], [1, 3], [1, 3],
            [1, 3], [1, 3], [1, 3],
            [1, 3], [1, 3], [1, 3] ];
    } // construtor

    Move()
    {
        switch(this.direction)
        {
            case this.dir.LEFT:
            {
                for(let i = 0; i < 4; i++)
                {
                    this.ship[i][1] -= 1;
                }
                break;
            }
            case this.dir.RIGHT:
            {
                for(let i = 0; i < 4; i++)
                {
                    this.ship[i][1] += 1;
                }
                break;
            }
        }
    } // Move()

    GetPos()
    {
        return this.ship;
    }
} // Player
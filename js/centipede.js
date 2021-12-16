
class Centipede
{
    constructor()
    {
        this.dir = {
            DOWN: 1,
            LEFT: 2,        
            RIGHT: 3 }
        this.direction = this.dir.DOWN;
        this.moveCount = 0;
        // row
        this.head = [
            [0, 53],
            [0, 54],
            [1, 53],
            [1, 54] ];
        this.trail = [];
    } // constructor

    Move() // moves only head
    {
        this.trail.push(
            [this.head[0][0], 
            this.head[0][1],
            this.head[1][0], 
            this.head[1][1],
            this.head[2][0], 
            this.head[2][1],
            this.head[3][0], 
            this.head[3][1]] );
        if(this.trail.length >= 12)
        {
            shroom.WipeTail(this.trail);
            this.trail.shift();
        }
        switch(this.direction)
        {
            case this.dir.DOWN:
            {
                for(let i = 0; i < 4; i++)
                {
                    this.head[i][0] += 1;
                }
                break;
            }
            case this.dir.LEFT:
            {
                for(let i = 0; i < 4; i++)
                {
                    this.head[i][1] -= 1;
                }
                break;
            }
            case this.dir.RIGHT:
            {
                for(let i = 0; i < 4; i++)
                {
                    this.head[i][1] += 1;
                }
                break;
            }
        }
    } // Move()

    GetHead()
    {
        return this.head;
    } // GetHead()
}
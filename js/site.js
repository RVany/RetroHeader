
let cell = '';
let speed = 100;
let maxCol = 10;
let ghosts = new Array();
let pinky = new Ghost(9, -15, '#ff69b4');
let inky = new Ghost(9, -10, '#00f');
let blinky = new Ghost(9, -10, '#f00');
let clyde = new Ghost(9, -10, '#ffa500');
let newVolume = 0;
let player = new Player();
ghosts.push(pinky);
let pacman = new Pacman(9, -50);
let digdug = new Digdug(0, -16);
let pooka= new Pooka(0, 0);
let fygar = new Fygar(0, 100);
let colors = ['rgb(0, 0, 0)',              // block fill (black)
              'rgb(255, 0, 100)',          // block fill (pink)
              'rgb(255, 255, 255)',        // block active (white)
              'rgb(255, 255, 0)',          // block inactive (yellow)
              'rgb(0, 0, 255)',            // block paused (blue)
              'rgba(0, 0, 0, 0)',
              'rgb(165, 211, 10)',
              'linear-gradient(to top left, rgb(165, 221, 10) 20%, #000 80%)',
              'linear-gradient(to top, rgb(165, 221, 10) 95%, #000 5%)',
              'linear-gradient(to top right, rgb(165, 221, 10) 20%, #000 80%)',
              'radial-gradient(#f00 60%, #000)',
              'rgb(9, 158, 146)'];
let glitchColors = ['rgb(255, 0, 255)',          
                    'rgb(255, 0, 100)',     
                    'rgb(255, 255, 255)',   
                    'rgb(255, 255, 0)',     
                    'rgb(0, 0, 255)',       
                    'rgb(0, 255, 255)'];
let glitchVals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
                    '*', '!', '@', '$', "%", '^', '&', '(', ')'];
let gridData = new Array();
let itemGrid = new Items();
for(let i = 0; i < 40; i++)
{
    gridData[i] = new Array();
    for(let j = 0; j < 100; j++)
    {
        gridData[i][j] = 0;
    }
}
let gameTimer = setInterval("Move()", speed);
let audioFade = '';
let playCount = 0;
let chomp = document.getElementById('chomp');
chomp.play();
chomp.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
$('document').ready(function() 
{
    PaintGrid(); // initial paint

});
function DrawGhost(thatGhost) // right
{
    for(let i = 0; i < thatGhost.ghostData[0].length; i++)
    {
        for(let j = 0; j < thatGhost.ghostData[1].length; j++)
        {
            let val = thatGhost.ghostData[i][j];
            if(val == 1)
            {
                let x = thatGhost.x + i;
                let y = thatGhost.y + j;
                cell = $('#r' + x + 'c' + y);
                cell.css('background', thatGhost.color);
                if(itemGrid != null)
                {
                    if(itemGrid.itemGrid[x][y] == 1)
                    {
                        itemGrid.itemGrid[x][y] = 3;
                    }
                }
            }
            else if(val == 2)
            {
                let x = thatGhost.x + i;
                let y = thatGhost.y + j;
                cell = $('#r' + x + 'c' + y);
                cell.css('background', colors[2]);
                if(itemGrid != null)
                {
                    if(itemGrid.itemGrid[x][y] == 1)
                    {
                        itemGrid.itemGrid[x][y] = 3;
                    }
                }
            }
            else if(val == 4)
            {
                let x = thatGhost.x + i;
                let y = thatGhost.y + j;
                cell = $('#r' + x + 'c' + y);
                cell.css('background', colors[4]);
                if(itemGrid != null)
                {
                    if(itemGrid.itemGrid[x][y] == 1)
                    {
                        itemGrid.itemGrid[x][y] = 3;
                    }
                }
            }
        }
    }
} // DrawGhost()
function DrawPacMan() // again, to the right
{
    let pman = pacman.open ? pacman.pacmanOpen : pacman.pacmanClosed;
    for(let i = 0; i < pacman.pacmanOpen[0].length; i++)
    {
        for(let j = 0; j < pacman.pacmanOpen[1].length; j++)
        {
            let val = pman[i][j];
            if(val == 1)
            {
                let x = pacman.x + i;
                let y = pacman.y + j;
                cell = $('#r' + x + 'c' + y);
                cell.css('background', colors[3]);
                if(itemGrid.itemGrid[x][y] == 3)
                {
                    itemGrid.itemGrid[x][y] = 1;
                }
            }
        }
    }
    pacman.open = !pacman.open;
} // DrawPacMan
function ClearGrid()
{
    for(let i = 0; i < 40; i++)
    {
        for(let j = 0; j < 100; j++)
        {
            if(gridData[i][j] < 6)
            {
                cell = $('#r' + i + 'c' + j);
                cell.css('background', colors[0]);
            }
            else if(gridData[i][j] == 6)
            {
                cell = $('#r' + i + 'c' + j);
                cell.text(glitchVals[Math.floor(Math.random() * glitchVals.length)]);
                cell.css('color', glitchColors[Math.floor(Math.random() * glitchColors.length)]);
                cell.css('background', '#222');
            }
            else
            {
                cell = $('#r' + i + 'c' + j);
                cell.text('');
                cell.css('background', colors[5]);
            }
        }
    } 
} // ClearGrid()
function PaintGrid()
{
    let header = $('header');
    header.empty();

    let pageW = window.innerWidth;
    let calcHeight = pageW / 100;
    let ourStyle = '<style>.block{width: 1%; font-size: .3em; background: #000; float: left; height: ';
    ourStyle += calcHeight;
    ourStyle += 'px; z-index: 13; padding-top: -4px; position: relative; text-align: center;}</style>';
    let headerHeight = calcHeight * 40;
    $('header').css('min-height', headerHeight);
    $('head').append(ourStyle);
    for(let i = 0; i < 40; i++)
    {
        for(let j = 0; j < 100; j++)
        {
            let block = document.createElement('div');
            block.setAttribute('class', 'block');
            block.setAttribute('id', 'r' + i + 'c' + j);
            header.append(block);
        }
    }
    for(ghost of ghosts)
    {
        DrawGhost(ghost);
    }
} // PaintGrid()
function DrawItems()
{
    for(let i = 0; i < itemGrid.itemGrid.length; i++)
    {
        for(let j = 0; j < itemGrid.itemGrid[0].length; j++)
        {
            if(itemGrid.itemGrid[i][j] == 3)
            {
                cell = $('#r' + i + 'c' + j);
                cell.css('background', colors[3]);
            }
        }
    }
} // DrawItems()
function Move()
{
    ClearGrid();
    DrawItems();
    
    for(ghost of ghosts)
    {
        ghost.Move(ghost.color);
        DrawGhost(ghost);
    }
    pacman.Move();
    DrawPacMan();
    // maybe stop the madness?
    if(pacman.moves >= 150)
    {
        clearInterval(gameTimer);
        ghosts.pop(inky);
        inky = null;
        pinky = null;
        pacman = null;
        blinky = null;
        clyde = null;
        itemGrid = null;
        gameTimer = setInterval("Move2()", speed / 2);
    }
    
    if(pacman != null)
    {
        if(pacman.moves == 90)
        {
            // kill pinky, swap with inky
            // then carry on
            inky.y = pinky.y;
            // inky.itemGrid = pinky.itemGrid;
            inky.moves = pinky.moves;
            ghosts.pop(pinky);
            ghosts.push(inky);
            pinky = null;
            DrawGhost(ghosts[0]);
        }
    }
  /*  if(ghosts[2].y >= 50)
    {
        clearInterval(gameTimer);
        gameTimer = setInterval('MoveCent()', 100);

    }*/

} // Move()
function Move2()
{
    ClearGrid();
    if(ghosts.length === 0)
    {
         // add new ghosts
        pinky = new Ghost(-1, -29, '#ff69b4');
        blinky = new Ghost(12, -31, '#f00');
        clyde = new Ghost(25, -33, '#ffa500');
        ghosts.push(pinky, blinky, clyde);
    }
    
    for(ghost of ghosts)
    {
        ghost.Move(ghost.color);
        DrawGhost(ghost);
    }

    if(ghosts[2].moves >= 42)
    {
        PickCells();
    }
} // Move2()
function PickCells()
{
    if(maxCol <= 110)
    {
        maxCol++;
    }
    else
    {
        clearInterval(gameTimer);
        gameTimer = setInterval("Move2()", speed / 50);
        $('.block').fadeOut(2600);
        VolumeDown();
    } 
    let picks = 0;
    let loopCount = 0;
    while(picks <= 67)
    {
        loopCount++;
        let randX = Math.floor(Math.random() * 40);
        let randY = Math.floor(Math.random() * maxCol);
        if(gridData[randX][randY] < 6)
        { 
            gridData[randX][randY] = 6;
            picks++;
        }
        else if(gridData[randX][randY] == 6)
        {
            var num = gridData[randX][randY];
            num++;
            gridData[randX][randY] = num;
            picks++;
        }
        else
        {
            gridData[randX][randY] = 7;
        }
        if(loopCount >= 4200)
        {
            clearInterval(gameTimer); // kill that timer!
            break;
        }
    }      
} // PickCells()
function VolumeDown()
{
    $('#chomp').animate({volume: newVolume}, 2150);
} // VolumeDown()
//===========================================>>
//========== Centipede!! OMG! =============>>
let shroom = new Shroom();
let centipede = new Centipede();
document.getElementById("cent").addEventListener("click", function(event)
{
    event.preventDefault();
    clearInterval(gameTimer);
    for(let i = 0; i < 40; i++)
    {
        for(let j = 0; j < 100; j++)
        {
            let cell = $('#r' + i + 'c' + j);
            cell.text('');
            gridData[i][j] = 0;
        }
    }
    ClearGrid();
    $('.block').fadeIn(300); // fade in cells
    DrawShrooms();
    gameTimer = setInterval('MoveCent()', 100);
    // playerTimer = setInterval('MovePlayer()', 100);
});
function DrawShrooms()
{
    for(let i = 0; i < 40; i++) {
        for(let j = 0; j < 100; j++) {
            let cell = $('#r' + i + 'c' + j);
            let val = shroom.shroomPatch[i][j];
            cell.css('background', colors[val]);
        }
    }
} // DrawShrooms()
function MoveCent()
{
    centipede.Move();
    let headPos = centipede.GetHead();
    if(shroom.turns == 6)
    {
        clearInterval(gameTimer);
        gameTimer = setInterval('MoveCent()', 50);
    }
    // shroom.RedrawCent(headPos, playerPos);
    // DrawShrooms();
    if(shroom.turns >= (shroom.path.length - 1))
    {
        clearInterval(gameTimer);
    }
    MovePlayer(headPos);
    
} // MoveCent()
function MovePlayer(headPos)
{
    player.Move();
    let playerPos = player.GetPos();
    shroom.RedrawCent(headPos, playerPos);
    DrawShrooms();
}
//===========================================>>
//========== DigDug!!!!!!!!!!!! =============>>
let digdugColors = [ 
            'rgb(0, 0, 0)',         // 0 Black
            'rgb(255, 170, 0)',     // 1 Bg1  
            'rgb(255, 128, 0)',     // 2 Bg2   
            'rgb(255, 102, 0)',     // 3 bg3  
            'rgb(204, 51, 0)',      // 4 bg4   
            'rgb(255, 0, 0)',       // 5 Red           
            'rgb(0, 0, 255)',       // 6 Blue
            'rgb(255, 255, 255)',   // 7 White
            'rgb(255, 255, 0)',     // 8 Yellow
            'rgb(0, 255, 0)'        // 9 Green
            
            ];
for(let i = 0; i < 40; i++)
{    
    digdug.DigDugBackgroundGridData[i] = new Array();
    for(let j = 0; j < 100; j++)
    {
        digdug.DigDugBackgroundGridData[i][j] = 0;
    }
}
document.getElementById("digdug").addEventListener("click", function(event)
{
   event.preventDefault();
   clearInterval(gameTimer);
  
   $('.block').fadeIn(300);
   
   gameTimer = setInterval("MoveDigdug()", 5);
});
function DrawDigDugBackground()
{
    for(let i = 0; i < 40; i++)
    {
        for(let j = 0; j < 100; j++)
        {
            let cell = $('#r' + i + 'c' + j);
            let val = digdug.DigDugBackgroundGridData[i][j];
            if(i < 8)
            {
                cell.css({"background": digdugColors[1],"color" : digdugColors[4]});
                cell.text('.');
            }
            else if(i >= 8  && i < 16)
            {
                cell.css({"background": digdugColors[2],"color" : digdugColors[4]});
                cell.text('.');
            }
            else if(i >= 16 && i < 28)
            {
                cell.css({"background": digdugColors[3],"color" :digdugColors[4]});
                cell.text('.');
            }
            else 
            {
                cell.css({"background": digdugColors[4],"color" : digdugColors[1]});
                cell.text('.');
            }
            if(val == 4)
            {
                cell.css({"background": digdugColors[0],"color" :digdugColors[0]});
                cell.text('.');
            }
        }
    }
}//DrawDigDugBackground()
function DrawDigDug()
{
    for(let i = 0; i < digdug.DigDugGridDataRight.length; i++)
    {      
        for(let j = 0; j < digdug.DigDugGridDataRight[i].length; j++)
        {
            let x = digdug.x + i;
            let y = digdug.y + j;
            cell = $('#r' + x + 'c' + y); 
            let digdugval = digdug.down ? digdug.DigDugGridDataRight : digdug.DigDugGridDataRightdown;
            if(digdug.x == 12 ) 
            {
            digdugval = digdug.down ? digdug.DigDugGridDataLeft : digdug.DigDugGridDataLeftdown;
            }
            let val = digdugval[i][j];
            if(val == 1 )
            {
                cell.css({"background": digdugColors[5],"color" :digdugColors[5]});
                cell.text('');
            }
            if(val == 2)
            {
                cell.css({"background": digdugColors[6],"color" :digdugColors[6]});
                cell.text('');
            }
            if(val == 3)
            {   
                cell.css({"background": digdugColors[7],"color" :digdugColors[7]});
                cell.text('');
            }
            if(val == 4)
            {
                cell.css({"background": digdugColors[0],"color" :digdugColors[0]});
                cell.text('');
            }
            if(y == 116  && digdug.x == 0)
            {
                digdug.x += 12; 
                digdugColors = [ 
                    'rgb(0, 0, 0)',         // 0 Black
                    'rgb(204, 255, 230)',     // 1 Bg1  
                    'rgb(77, 255, 169)',     // 2 Bg2   
                    'rgb(26, 255, 144)',     // 3 bg3  
                    'rgb(0, 153, 70)',      // 4 bg4   
                    'rgb(255, 0, 0)',       // 5 Red           
                    'rgb(0, 0, 255)',       // 6 Blue
                    'rgb(255, 255, 255)',   // 7 White
                    'rgb(255, 255, 0)',     // 8 Yellow
                    'rgb(0, 255, 0)'        // 9 Green
                    
                ];

            } 
            if(y == -17 && digdug.x == 12)
            {
                digdug.x += 12;  
                digdugColors = [ 
                    'rgb(0, 0, 0)',         // 0 Black
                    'rgb(204, 238, 255)',     // 1 Bg1  
                    'rgb(153, 221, 255)',     // 2 Bg2   
                    'rgb(153, 204, 255)',     // 3 bg3  
                    'rgb(0, 128, 255)',      // 4 bg4   
                    'rgb(255, 0, 0)',       // 5 Red           
                    'rgb(0, 0, 255)',       // 6 Blue
                    'rgb(255, 255, 255)',   // 7 White
                    'rgb(255, 255, 0)',     // 8 Yellow
                    'rgb(0, 255, 0)'        // 9 Green
                    
                    ];       
                           
            } 
            if(y == 117 && digdug.x == 24 )
            {
                digdug.y = -16;
                digdug.x = 0;
                digdugColors =   [ 
                    'rgb(0, 0, 0)',         // 0 Black
                    'rgb(255, 170, 0)',     // 1 Bg1  
                    'rgb(255, 128, 0)',     // 2 Bg2   
                    'rgb(255, 102, 0)',     // 3 bg3  
                    'rgb(204, 51, 0)',      // 4 bg4   
                    'rgb(255, 0, 0)',       // 5 Red           
                    'rgb(0, 0, 255)',       // 6 Blue
                    'rgb(255, 255, 255)',   // 7 White
                    'rgb(255, 255, 0)',     // 8 Yellow
                    'rgb(0, 255, 0)'        // 9 Green
                    
                    ];
            }

            if(val == 5 )
            {
                if(digdug.x == 12) 
                {
                    digdug.DigDugBackgroundGridData[x+2][y-15] = 4;
                    digdug.DigDugBackgroundGridData[x+2][y-16] = 4;
                }
                else
                {
                    digdug.DigDugBackgroundGridData[x+2][y+16] = 4;
                    digdug.DigDugBackgroundGridData[x+2][y+15] = 4;
                }
            }

            
        }
    }
    digdug.down = !digdug.down;
}// DrawDigDug()
function DrawPooka()
{
    for(let i = 0; i < pooka.PookaGridData.length; i++)
    {
        for(let j = 0; j <  pooka.PookaGridData[i].length; j++)
        {
            let val = pooka.PookaGridData[i][j];

            let x = pooka.x + i+ 5;
            let y = pooka.y + j + 75;
            cell = $('#r' + x + 'c' + y);
            
            let x1 = pooka.x + i + 6;
            let y1 = pooka.y + j + 10;
            let cell2 = $('#r' + x1 + 'c' + y1); 

            let x2 = pooka.x + i + 15;
            let y2 = pooka.y + j + 40;
            let cell3 = $('#r' + x2 + 'c' + y2); 

            if(val == 6)
            {
                if(digdug.digdugcount >= 60)
                {
                cell.css({"background": digdugColors[8],"color" :digdugColors[5]});
                cell.text('');
                }
                if(digdug.digdugcount >= 90 )
                {
                cell2.css({"background": digdugColors[8],"color" :digdugColors[5]});
                cell2.text('');
                }
                if(digdug.digdugcount >= 150) 
                {                                                                   
                cell3.css({"background": digdugColors[8],"color" :digdugColors[5]});
                cell3.text('');
                }
            }  
            if(val == 1 )
            {
                if(digdug.digdugcount >= 60 )
                {
                    cell.css({"background": digdugColors[5],"color" :digdugColors[5]});
                    cell.text('');
                }
                if(digdug.digdugcount >= 90 )
                {
                    cell2.css({"background": digdugColors[5],"color" :digdugColors[5]});
                    cell2.text(''); 
                } 
                if(digdug.digdugcount >= 150 )
                {
                    cell3.css({"background": digdugColors[5],"color" :digdugColors[5]});
                    cell3.text(''); 
                } 
            }

            if(val == 3)
            {   
                if(digdug.digdugcount >= 60  )
                {
                    cell.css({"background": digdugColors[7],"color" :digdugColors[7]});
                    cell.text('');
                }
                if(digdug.digdugcount >= 90  )
                {                                                                                                           
                    cell2.css({"background": digdugColors[7],"color" :digdugColors[7]});
                    cell2.text('');
                }
                if(digdug.digdugcount >= 150  )
                {
                cell3.css({"background": digdugColors[7],"color" :digdugColors[7]});
                cell3.text('');
                }
            }

            if(val == 4)
            {
                if(digdug.digdugcount >= 60  )
                {
                    cell.css({"background": digdugColors[0],"color" :digdugColors[0]});
                    cell.text('');
                }
                if(digdug.digdugcount >= 90  )
                { 
                    cell2.css({"background": digdugColors[0],"color" :digdugColors[0]});
                    cell2.text('');
                }
                if(digdug.digdugcount >= 150 )
                {
                    cell3.css({"background": digdugColors[0],"color" :digdugColors[0]});
                    cell3.text('');
                }
            }

            if(pooka.x == 9)
            {
                pooka.x = 0;
            }

            if(pooka.y == 20)
            {
                pooka.y = 0;
            }

            if(val == 5)
            {
                if(digdug.digdugcount >= 60)
                {
                    digdug.DigDugBackgroundGridData[x][y] = 4;
                }
                if(digdug.digdugcount >= 90)
                {
                    digdug.DigDugBackgroundGridData[x1][y1] = 4;
                }
                if(digdug.digdugcount >= 150)
                {
                    digdug.DigDugBackgroundGridData[x2][y2] = 4;
                }                                            
            }

        }
    }
}//draw Pooka

function DrawFygar()
{
    for(let i = 0; i < fygar.FygarGridRightClosed.length; i++)
    {
        for(let j = 0; j <  fygar.FygarGridRightClosed[i].length; j++)
        {
           let x = fygar.x + i;
           let y = fygar.y + j;
           cell = $('#r' + x + 'c' + y); 
           let fygarval = fygar.open ? fygar.FygarGridDataLeftOpen : fygar.FygarGridLeftClosed;
           if(fygar.x == 12 ) 
           {
                fygarval = fygar.open ? fygar.FygarGridDataRithtOpen : fygar.FygarGridRightClosed;
           }
           let val = fygarval[i][j];
           if(val == 1 )
           {
               cell.css({"background": digdugColors[5],"color" :digdugColors[5]});
               cell.text('');
           }
           if(val == 3)
           {   
               cell.css({"background": digdugColors[7],"color" :digdugColors[7]});
               cell.text('');
           }
           if(val == 4)
           {
               cell.css({"background": digdugColors[0],"color" :digdugColors[0]});
               cell.text('');
           }
           if(val == 7)
            {
                cell.css({"background": digdugColors[9],"color" :digdugColors[9]});
                cell.text('');
            }
          if(val == 5 )
           {
              digdug.DigDugBackgroundGridData[x][y] = 4;
           }          
          
            if(y == -16  && fygar.x == 0)
            {
                fygar.x += 12;                           
            } 
            if(y == 117 && fygar.x == 12)
            {
                fygar.x += 12;          
                           
            } 
            if(y == -17 && fygar.x == 24 )
            {
                fygar.y = 100;
                fygar.x = 0;
            }

        }
    }

    fygar.open = !fygar.open;
}

function MoveDigdug()
{  
    DrawDigDugBackground();
    DrawDigDug();
    digdug.Move(); 
    
    if(digdug.digdugcount >= 20)
    {
         DrawFygar();
         fygar.Move();
    }
    if(digdug.digdugcount >= 60 )
    {
        DrawPooka(); 
        pooka.Move();
    }
    
} // MoveDigDug()


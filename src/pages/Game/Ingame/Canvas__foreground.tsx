import React, { useEffect, useRef} from 'react'
import {SingleCanvas} from './styles'
interface GameDataType {
  ball_pos    : { x : number, y : number };
  paddle_pos  : { p1: number, p2: number };
  paddle_size : { p1: number, p2: number }; 
}

const Canvas__foreground = (props : any) : JSX.Element => {
  const socket = props.socket;
  const CANV_RATIO = props.width / 1200;
  
  const CANV_W = props.width;
  const CANV_H = CANV_W * 2 / 3;
  const BALL_RAD = 30 * CANV_RATIO;
  const PADDLE_H = CANV_H / 5;
  const PADDLE_W = PADDLE_H / 20 * 3;
  const PADDLE_L = PADDLE_W * 5 / 3;
  const PADDLE_R = CANV_W - PADDLE_L;

  const canvasRef = useRef(null);
  let game_data = {
    ball_pos   : { x : 0, y : 0 },
    paddle_pos : { p1: 0, p2: 0 },
    paddle_size: { p1: PADDLE_H, p2: PADDLE_H }
  }

  
  useEffect( () => {
    const canvas : any = canvasRef.current;
    const context = canvas.getContext('2d');
    
    socket.on("update_game", (data : GameDataType ) => {
      redraw_game(context, game_data, data);
      game_data = data;
    })
    redraw_game(context, game_data, game_data);
    return () => {
      props.socket.off("update_game");
    }
  }, [])

  return ( 
    <>
      <SingleCanvas ref={canvasRef} width={CANV_W} height={CANV_H}/>
    </>
  );
  
  function redraw_game(
    context : any,
    old_data : GameDataType,
    new_data : GameDataType,
  ) : void {
    
    redraw_ball( context, old_data.ball_pos, new_data.ball_pos, 'orange' );
    
    redraw_paddle (
      context,
      [PADDLE_L, old_data.paddle_pos.p1],
      old_data.paddle_size.p1,
      [PADDLE_L, new_data.paddle_pos.p1],
      new_data.paddle_size.p1,
      'red'
    )
    
    redraw_paddle (
      context,
      [PADDLE_R, old_data.paddle_pos.p2],
      old_data.paddle_size.p2,
      [PADDLE_R, new_data.paddle_pos.p2],
      new_data.paddle_size.p2,
      'green'
    )
  }

  function redraw_ball( 
    ctx : any , 
    old_info : { x : number, y : number },
    new_info : { x : number, y : number },
    color : string
  ) : void {
    // erase old ball
    const old_x = old_info.x * CANV_RATIO + CANV_W / 2;
    const old_y = old_info.y * CANV_RATIO + CANV_H / 2;
    const old_r = BALL_RAD + 1;
    ctx.clearRect(old_x - old_r, old_y - old_r, old_r * 2, old_r * 2);

    // draw new ball
    const new_x = new_info.x * CANV_RATIO + CANV_W / 2;
    const new_y = new_info.y * CANV_RATIO + CANV_H / 2;
    const new_r = BALL_RAD;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(new_x, new_y, new_r, new_r, 0, 0, 2*Math.PI);
    ctx.fill();
  }

  function redraw_paddle(
    ctx : any,
    old_center : [number, number],
    old_size : number,
    new_center : [number, number],
    new_size : number,
    color : string
  ) : void {
    // erase old paddle
    const old_x = old_center[0];
    const old_y = old_center[1];
    const old_ltx = old_x - PADDLE_W / 2 - 1;
    const old_lty = (old_y * CANV_RATIO + CANV_H / 2 ) - old_size / 2 - 1;
    ctx.clearRect(old_ltx, old_lty, PADDLE_W + 2, old_size + 2);

    // draw new paddle
    const new_x = new_center[0];
    const new_y = new_center[1];
    const rad   = PADDLE_W / 2;
    const new_left = new_x - rad;
    const new_top = (new_y * CANV_RATIO + CANV_H / 2 ) - new_size / 2 + rad;
    const new_bot = (new_y * CANV_RATIO + CANV_H / 2 ) + new_size / 2 - rad;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.fillRect(new_left, new_top, PADDLE_W, new_size - PADDLE_W);
    ctx.ellipse(new_x, new_top, rad, rad, 0, 0, 2*Math.PI);
    ctx.ellipse(new_x, new_bot, rad, rad, 0, 0, 2*Math.PI);
    ctx.fill();
  }
}

export default Canvas__foreground

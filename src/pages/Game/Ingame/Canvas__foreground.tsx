import React, { useEffect, useRef} from 'react'
import {SingleCanvas} from './styles'
interface GameDataType {
  ballPos    : { x : number, y : number };
  paddlePos  : { p1: number, p2: number };
  paddleSize : { p1: number, p2: number }; 
}

const Canvas__foreground = (props : any) : JSX.Element => {
  const socket = props.socket;
  const CANV_RATIO = props.width / 1200;
  
  const CANV_W   = CANV_RATIO * 1200;
  const CANV_H   = CANV_RATIO * 800;
  const BALL_RAD = CANV_RATIO * 30;
  const PADDLE_H = CANV_RATIO * 200;
  const PADDLE_W = CANV_RATIO * 24;
  const PADDLE_L = CANV_RATIO * 40;
  const PADDLE_R = CANV_W - PADDLE_L;

  const canvasRef = useRef(null);
  let game_data = {
    ballPos   : { x : 0, y : 0 },
    paddlePos : { p1: 0, p2: 0 },
    paddleSize: { p1: PADDLE_H, p2: PADDLE_H }
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
    
    redraw_ball( context, old_data.ballPos, new_data.ballPos, 'orange' );
    
    redraw_paddle (
      context,
      [PADDLE_L, old_data.paddlePos.p1],
      old_data.paddleSize.p1,
      [PADDLE_L, new_data.paddlePos.p1],
      new_data.paddleSize.p1,
      'red'
    )
    
    redraw_paddle (
      context,
      [PADDLE_R, old_data.paddlePos.p2],
      old_data.paddleSize.p2,
      [PADDLE_R, new_data.paddlePos.p2],
      new_data.paddleSize.p2,
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
    const old_h = old_size * CANV_RATIO;
    const old_x = old_center[0];
    const old_y = old_center[1];
    const old_left = old_x - PADDLE_W / 2 - 1;
    const old_top = (old_y * CANV_RATIO + CANV_H / 2 ) - old_h / 2 - 1;
    ctx.clearRect(old_left, old_top, PADDLE_W + 2, old_h + 2);

    // draw new paddle
    const new_h = new_size * CANV_RATIO;
    const new_x = new_center[0];
    const new_y = new_center[1];
    const rad   = PADDLE_W / 2;
    const new_left = new_x - rad;
    const new_top = (new_y * CANV_RATIO + CANV_H / 2 ) - new_h / 2 + rad;
    const new_bot = (new_y * CANV_RATIO + CANV_H / 2 ) + new_h / 2 - rad;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.fillRect(new_left, new_top, PADDLE_W, new_h - PADDLE_W);
    ctx.ellipse(new_x, new_top, rad, rad, 0, 0, 2*Math.PI);
    ctx.ellipse(new_x, new_bot, rad, rad, 0, 0, 2*Math.PI);
    ctx.fill();
  }
}

export default Canvas__foreground

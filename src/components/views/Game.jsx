import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import image1 from '../../images/step-01.PNG'
export default function Game(props) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Typography variant={"h5"} aria-label="recipe">
                        {props.userName}
                    </Typography>
                }
                action={
                    <div>
                        <h4 className={"mt-3"}>Score: {props.userScore}</h4>
                        <button className="btn btn-danger btn-sm">Give Up</button>
                    </div>

                }
            />
            <CardContent>
                <Typography variant="p" color="text.secondary">
                    Your partner is Username
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                image={image1}
                width={250} height={450}
                alt="Paella dish"
            />
        </Card>
    );
}
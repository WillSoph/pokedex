import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    whatsapp: {
        color: '#00aa13',
    },
}))

export function Title() {
    const classes = useStyles();

    const handleWhatsapp = () => {
        window.open('https://web.whatsapp.com/send?phone=5511989780024')
    }
    const handleLinkedIn = () => {
        window.open('https://www.linkedin.com/in/willians-f-a05876153/')
    }

    return (
        <>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Willians Ferreira
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Este é um teste para a empresa VR Benefícios que consiste em criar uma listagem de todos os pokemon e os detalhes de cada um deles.
                </Typography>
                <div className={classes.heroButtons}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleLinkedIn}>
                                Meu LinkedIn
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" className={classes.whatsapp} onClick={handleWhatsapp}>
                                Meu WhatsApp
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    )
}

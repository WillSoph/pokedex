import React, { useEffect, useState } from 'react';
import axios from 'axios'
import AppBar from '@material-ui/core/AppBar';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router';
import { Title } from './../../components/Title';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Desenvolvodo por '}
            <Link color="inherit" href="https://material-ui.com/">
                Willians Ferreira
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20px 0',
    },
    appbar: {
        background: '#00aa13'
    },
    whatsapp: {
        color: '#00aa13',
    },
    icon: {
        marginRight: theme.spacing(2),
        cursor: 'pointer'
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    rootCard: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    media: {
        height: 0,
        paddingTop: '36.25%', // 16:9
        backgroundSize: 'contain'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#00aa13'
    },
}));

export default function Home() {
    const classes = useStyles();
    const history = useHistory()

    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [foto, setFoto] = useState('')
    const [tipo, setTipo] = useState('')
    const [experience, setExperience] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [habilidades, setHabilidades] = useState('')
    const [moves, setMoves] = useState('')
    const [valorUrl, setValorUrl] = useState('')
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleBack = () => {
        history.push('/')
    }

    const newUrl = localStorage.getItem('pokeUrl')

    useEffect(() => {
        axios
            .get(newUrl)
            .then(response => {
                setId(response.data.order)
                setNome(response.data.name)
                setExperience(response.data.base_experience)
                setHeight(response.data.height)
                setWeight(response.data.weight)
                setFoto(response.data.sprites.other.dream_world.front_default)
                const pokeTipo = response.data.types.map(item => (
                    <span key={item.type.name}>{item.type.name} </span>
                ))
                const pokeAbility = response.data.abilities.map(item => (
                    <ListItem button key={item.ability.name} >
                        <ListItemText primary={item.ability.name} />
                    </ListItem>
                ))
                const pokeMoves = response.data.moves.map(item => (
                    <ListItem button key={item.move.name} >
                        <ListItemText primary={item.move.name} />
                    </ListItem>
                ))
                setTipo(pokeTipo)
                setHabilidades(pokeAbility)
                setMoves(pokeMoves)
            })
            .catch(error => {
                console.log(error)
            })
    }, [newUrl])

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative" className={classes.appbar}>
                <Toolbar>
                    <ArrowBackIcon className={classes.icon} onClick={handleBack} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Teste VR Benefícios
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Title />
                </div>
                <Container maxWidth="md">
                    {/* End hero unit */}
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {id}
                                </Avatar>
                            }
                            title={nome}
                            subheader={tipo}
                        />
                        <CardMedia
                            className={classes.media}
                            image={foto}
                            title={nome}
                        />
                        <CardContent>
                            <Typography variant="subtitle2" color="textSecondary" component="h4">
                                Base Experience: {experience} / Height: {height} / Weight: {weight}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Abilities:</Typography>
                                <Typography paragraph>
                                    {habilidades}
                                </Typography>
                                <Typography paragraph>Moves:</Typography>
                                <Typography paragraph>
                                    {moves}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Obrigado pela oportunidade
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Espero que gostem!
                </Typography>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}
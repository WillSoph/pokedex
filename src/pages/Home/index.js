import React, { useEffect, useState } from 'react';
import axios from 'axios'
import AppBar from '@material-ui/core/AppBar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router';
import { Title } from '../../components/Title';
import TextField from '@material-ui/core/TextField';

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
    icon: {
        marginRight: theme.spacing(2),
    },
    appbar: {
        background: '#00aa13'
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
    proximoAnterior: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    }
}));

export default function Home() {
    const classes = useStyles();
    const history = useHistory()

    const [lista, setLista] = useState('')
    const [anterior, setAnterior] = useState('')
    const [proximo, setProximo] = useState('')
    const [ability, setAbility] = useState('')
    const [name, setName] = useState('')
    const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')


    useEffect(() => {
        const handlePokeDetails = item => {
            console.log("Essa:", item.url)
            localStorage.setItem('pokeUrl', item.url)
            history.push('/detalhes')
        }
        axios
            .get(endpoint)
            .then(response => {
                const pokeLista = response.data.results.map(item => (
                    <Grid item xs={12} md={4} lg={4}>
                        <ListItem button key={item.url}>
                            <ListItemText style={{ textAlign: 'center' }} primary={item.name} onClick={() => { handlePokeDetails(item) }} />
                        </ListItem>
                    </Grid>
                ))
                setLista(pokeLista)
                setProximo(response.data.next)
                setAnterior(response.data.previous)
            })
            .catch(error => {
                console.log(error)
            })
    }, [endpoint])

    const handleChangeUrl = () => {
        setEndpoint(proximo)
    }
    const handleChangeUrlAnt = () => {
        setEndpoint(anterior)
    }
    const handleSearchAbility = () => {
        const handlePokeDetails = item => {
            localStorage.setItem('pokeUrl', item.pokemon.url)
            history.push('/detalhes')
        }
        axios
            .get(`http://pokeapi.co/api/v2/ability/${ability}`)
            .then(response => {
                const pokeLista = response.data.pokemon.map(item => (
                    <Grid item xs={12} md={4} lg={4}>
                        <ListItem button key={item.pokemon.name}>
                            <ListItemText style={{ textAlign: 'center' }} primary={item.pokemon.name} onClick={() => { handlePokeDetails(item) }} />
                        </ListItem>
                    </Grid>
                ))
                setLista(pokeLista)
                setProximo(response.data.next)
                setAnterior(response.data.previous)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleSearchName = () => {
        localStorage.setItem('pokeUrl', `http://pokeapi.co/api/v2/pokemon/${name}`)
        history.push('/detalhes')
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative" className={classes.appbar}>
                <Toolbar>
                    <HomeIcon className={classes.icon} />
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
                    <div className={classes.proximoAnterior}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField size="small" id="outlined-basic" label="Pokemon by Name" variant="outlined" onChange={(e) => { setName(e.target.value) }} />
                            <Button variant="outlined" onClick={handleSearchName} className={classes.whatsapp}>
                                Buscar
                            </Button>
                        </form>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField size="small" id="outlined-basic" label="Pokemon by Ability" variant="outlined" onChange={(e) => { setAbility(e.target.value) }} />
                            <Button variant="outlined" onClick={handleSearchAbility} className={classes.whatsapp}>
                                Buscar
                            </Button>
                        </form>
                    </div>
                    <div className={classes.proximoAnterior}>
                        <div>
                            <Button variant="outlined" onClick={handleChangeUrlAnt} className={classes.whatsapp}>
                                Anterior
                            </Button>
                        </div>
                        <div>
                            <Button variant="outlined" onClick={handleChangeUrl} className={classes.whatsapp}>
                                Próximo
                            </Button>
                        </div>
                    </div>
                </Container>
                <Container maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={3}>
                        {lista}
                    </Grid>
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
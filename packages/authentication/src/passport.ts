import { hash } from "./hash";
import { server } from "common";
import passport from "passport";
import local from "passport-local";



passport.use(new local.Strategy(
    (email, password, done) => {

        console.log("Inside strategy with", email, password)
        server.withDatabase(async database => {

            const user = await server.getUsers(database).findOne({
                email
            });

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password_hash !== hash(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        });
    }
));

export const authenticated = () =>
    passport.authenticate('local', { failureRedirect: '/login' });
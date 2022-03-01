module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'fd362533ae97539003dcec2669aa474a'),
  },
});

using Duende.IdentityServer.Models;
using Duende.IdentityServer;

namespace Radore.Services.Identity
{
    public static class SD
    {
        public const string Admin = "Admin";
        public const string Customer = "Customer";

        public static IEnumerable<IdentityResource> IdentityResources =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiScope> ApiScopes =>
        new List<ApiScope> {
                new ApiScope("radore", "Radore Server"),
                new ApiScope(name: "read",   displayName: "Veri Okuyabilir."),
                new ApiScope(name: "write",  displayName: "Veri Yazabiliri"),
                new ApiScope(name: "delete", displayName: "Veri Silebilir")
        };

        public static IEnumerable<Client> Clients =>
            new List<Client>
            {
                new Client
                {
                    ClientId="client",
                    ClientSecrets= { new Secret("secret".Sha256())},
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    AllowedScopes={ "read", "write","profile"}
                },
                new Client
                {
                    ClientId="radore",
                    ClientSecrets= { new Secret("secret".Sha256())},
                    AllowedGrantTypes = GrantTypes.Code,
                    RedirectUris={ "https://localhost:44378/signin-oidc" },
                    PostLogoutRedirectUris={"https://localhost:44378/signout-callback-oidc" },
                    AllowedScopes=new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        "radore"
                    }
                },
                new Client
                {
                    ClientId = "react-client",
                    AllowedGrantTypes = GrantTypes.Code,
                    RedirectUris = { "http://localhost:3000/authentication/callback","http://localhost:3000" },
                    PostLogoutRedirectUris = { "http://localhost:3000/authentication/silent-callback", "http://localhost:3000/" },
                    
                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        "radore",
                        IdentityServerConstants.StandardScopes.OfflineAccess,
                        "read",
                        "write",
                        "delete"
                    },
                    RequirePkce = true, // PKCE is recommended for public clients
                    RequireClientSecret = false, // Public clients should not have a secret
                    AllowOfflineAccess = true, // Enables refresh tokens
                    AllowedCorsOrigins = { "http://localhost:3000" } // CORS allowed origin
                }

            };
    }
}

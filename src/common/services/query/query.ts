export class Query {
  static dbHealthCheck() {
    return `select * from users`;
  }

  static getActiveUserAndPermissions(userId: number | string) {
    return `
          SELECT user_id, user_name, status,email,"type",mobile,"organizationId" as  "clientId","org_display_name" as "orgDisplayName",
          ARRAY_AGG (DISTINCT trim(role_name)) AS roles, 
          ARRAY_AGG (DISTINCT trim(permission_name)) AS permissions 
          FROM user_role_permissions 
          WHERE user_id = ${userId} and status = 'active'
          GROUP BY user_id,user_name, status,email,"type",mobile, "organizationId", "org_display_name";
        `;
  }

  static getActiveAppUserAndAccessPermissionsByUser(userId: number | string) {
    return `SELECT  "userName" ,"userId","appName" ,"appImage" ,"appUrl" , "appId","type","description",
        ARRAY_AGG (DISTINCT trim("appRoleName")) AS "appRoles",
        ARRAY_AGG (DISTINCT trim("appPermissionName")) AS "appPermissions"
        FROM user_app_role_permissions
        WHERE  "userId" = ${userId} and status = 'active'
        GROUP BY "userName","userId","appName" ,"appImage" ,"appUrl","appId","type","description"
        `;
  }

  static getActiveAppUserAndPermissions(
    userId: number | string,
    appId: number | string,
  ) {
    return `SELECT  "userName",
        "userId",
        "appName",
        "type",
        "mobile",
        Array_agg (DISTINCT Trim("appRoleName"))       AS "appRoles",
        Array_agg (DISTINCT Trim("appPermissionName")) AS "appPermissions" 
            FROM     user_app_role_permissions
    WHERE    "appId" =${appId}
    AND      "userId" = '${userId}'
    AND      status = 'active'
    GROUP BY "userName",
        "userId",
        "appName",
        "type",
        "mobile","description";
       `;
  }
}

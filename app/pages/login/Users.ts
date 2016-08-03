/**
 * 	AppUsers
 */
class 	AppUsers {
    public userId: string;
    public userName: string;
    public Role: AppRoles;
    public emailId: string;
    public AssignedTo: StandardClassAssigned[];
}

enum AppRoles
{
    Admin = 1, Teacher = 2 
}

class StandardClassAssigned
{
    public standardId: string;
    public classId: string;
    public keyValue: string;
}

export{AppUsers, AppRoles, StandardClassAssigned}
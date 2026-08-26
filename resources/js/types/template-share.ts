export type TemplateShare = {
  id: number;
  template_id: number;
  shared_with_user_id: number;
  created_at: string;
  updated_at: string;
};

export type TemplateShareWithRelations = TemplateShare & {
  template: {
    id: number;
    name: string;
    width_px: number;
    height_px: number;
    visibility: string;
  };
  sharedWithUser: {
    id: number;
    name: string;
    username: string;
  };
};

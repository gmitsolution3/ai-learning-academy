import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
import { Controller } from "react-hook-form";

interface IProps {
  form: any,
  onSubmit: (data: any) => void;
  isLoading: boolean
}

export default function ProfileEditForm({
  form,
  onSubmit,
  isLoading,
}: IProps) {
  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-white">Edit Profile</CardTitle>
        <CardDescription className="text-white/50">
          Update your personal information
        </CardDescription>
      </CardHeader>
      <Separator className="bg-white/10" />
      <CardContent className="pt-6">
        <form
          id="profile-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <input type="hidden" {...form.register("image")} />
          <input type="hidden" {...form.register("imagePublicId")} />

          <FieldGroup className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="profile-name">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="profile-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Your full name"
                      className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Email Field (Disabled) */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="profile-email">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="profile-email"
                      disabled
                      className="border-white/10 bg-black/40 text-white/50 cursor-not-allowed"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Phone Field */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="profile-phone">
                      Phone Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="profile-phone"
                      aria-invalid={fieldState.invalid}
                      placeholder="Your phone number"
                      className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Gender Field */}
              <Controller
                name="gender"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="profile-gender">
                      Gender
                    </FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger
                        id="profile-gender"
                        className="border-white/10 bg-black/40 text-white focus:border-secondary"
                      >
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-white/10 text-white">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Age Field */}
              <Controller
                name="age"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="profile-age">Age</FieldLabel>
                    <Input
                      type="number"
                      {...field}
                      id="profile-age"
                      aria-invalid={fieldState.invalid}
                      placeholder="Your age"
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber)
                      }
                      className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Education Level Field */}
              <Controller
                name="educationLevel"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="profile-education">
                      Education Level
                    </FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger
                        id="profile-education"
                        className="border-white/10 bg-black/40 text-white focus:border-secondary"
                      >
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-white/10 text-white">
                        <SelectItem value="high-school">
                          High School
                        </SelectItem>
                        <SelectItem value="bachelor">
                          Bachelor's Degree
                        </SelectItem>
                        <SelectItem value="master">
                          Master's Degree
                        </SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="diploma">
                          Diploma
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Institute Name Field - Full Width */}
              <div className="md:col-span-2">
                <Controller
                  name="instituteName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="profile-institute">
                        Institute Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id="profile-institute"
                        aria-invalid={fieldState.invalid}
                        placeholder="Your educational institute"
                        className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Occupation Field */}
              <div className="md:col-span-2">
                <Controller
                  name="occupation"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="profile-occupation">
                        Occupation
                      </FieldLabel>
                      <Input
                        {...field}
                        id="profile-occupation"
                        aria-invalid={fieldState.invalid}
                        placeholder="Your current occupation"
                        className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Address Field - Full Width */}
              <div className="md:col-span-2">
                <Controller
                  name="address"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="profile-address">
                        Address
                      </FieldLabel>
                      <Input
                        {...field}
                        id="profile-address"
                        aria-invalid={fieldState.invalid}
                        placeholder="Your address"
                        className="border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Bio Field */}
              <div className="md:col-span-2">
                <Controller
                  name="bio"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="profile-bio">
                        Bio
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id="profile-bio"
                          placeholder="Tell us a little about yourself..."
                          rows={4}
                          className="min-h-24 resize-none border-white/10 bg-black/40 text-white placeholder:text-white/30 focus:border-secondary"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums bg-black/60 border-white/10 text-white/60">
                            {field.value?.length || 0}/500 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription className="text-white/40">
                        Share your background, expertise, or interests
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full"
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="profile-form"
            disabled={isLoading}
            className="bg-gradient-to-r from-secondary to-primary text-white rounded-full"
          >
            {isLoading ? (
              "Saving..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

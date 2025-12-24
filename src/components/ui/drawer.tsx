import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

/* ——— BODY SCROLL LOCK (FIX MOBILE SCROLL) ——— */
const useBodyScrollLock = (open: boolean) => {
  React.useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;

    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY);
    };
  }, [open]);
};

/* ——— ROOT DRAWER ——— */
const Drawer = ({
  open,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => {
  useBodyScrollLock(Boolean(open));

  return (
    <DrawerPrimitive.Root
      modal
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
      {...props}
    />
  );
};

Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

/* ——— STATIC BACKDROP (NO BLUR – MOBILE SAFE) ——— */
const DrawerBackdrop = () => (
  <div
    className="
      fixed inset-0 z-40
      bg-black/60
      pointer-events-none
    "
  />
);

/* ——— VAUL OVERLAY (NO BLUR) ——— */
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-40 bg-transparent", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

/* ——— DRAWER CONTENT ——— */
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerBackdrop />
    <DrawerOverlay />

    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[85vh] flex-col rounded-t-[14px] border bg-background shadow-xl",
        className
      )}
      {...props}
    >
      {/* Handle */}
      <div className="mx-auto mt-4 h-1.5 w-14 rounded-full bg-muted" />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {children}
      </div>
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

/* ——— HEADER / FOOTER / TEXT ——— */
const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4", className)} {...props} />
);

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
